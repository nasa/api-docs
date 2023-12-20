# Set the variables
github_token="$GITHUB_TOKEN"
point_release="0"
pattern="point#([0-9]+)"

# Get the file from the repository
response=$(curl -sSL -H "Authorization: token $github_token" -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/nasa/customapps-release-tracker/contents/release.json")
release_json=$(echo $response | jq -r '.content' | base64 --decode)

# Get the latest appdat commit message
commit_message=$COMMIT_MESSAGE

# Extract the number following "point#"
point_release_number=$(echo $commit_message | grep -oP "$pattern" | grep -oP '[0-9]+')

# Check if a point release number was found
if [ -z "$point_release_number" ]; then
    echo "No point release number found in the commit message. Exiting script."
    exit 1
else
    echo "Point Release Number: $point_release_number"
fi

# find app in release json that martches the appdat repo
app=$(echo $release_json | jq -r --arg REPO_NAME "$REPO_NAME" '.[] | select(.name == $REPO_NAME)')

# Get the current release number
current_release_number=$(echo $app | jq -r '.release')

# Split the release number into its parts
IFS='.' read -r major minor patch point <<< "$current_release_number"

# Increment the appropriate part of the release number
case $point_release_number in
    1) major=$((major+1));;
    2) minor=$((minor+1));;
    3) patch=$((patch+1));;
    4) point=$((point+1));;
    *) echo "Invalid point release number. Exiting script."; exit 1;;
esac

# Construct the new release number
new_release_number="${major}.${minor}.${patch}.${point}"

# Update the app data in the release JSON
updated_release_json=$(echo $release_json | jq --arg REPO_NAME "$REPO_NAME" --arg new_release_number "$new_release_number" '(.[] | select(.name == $REPO_NAME).release) |= $new_release_number')

echo "Updated $REPO_NAME from $current_release_number to $new_release_number"

# Define the commit parameters
updated_content_base64=$(echo -n "$updated_release_json" | base64 -w 0)
sha=$(echo $response | jq -r '.sha')
commit_message="Update $REPO_NAME to $new_release_number"

# Create commit
commit_response=$(curl -sSL -X PUT -H "Authorization: token $github_token" \
    -H "Accept: application/vnd.github.v3+json" \
    -d "{\"message\": \"$commit_message\", \"content\": \"$updated_content_base64\", \"sha\": \"$sha\", \"branch\": \"main\"}" \
    "https://api.github.com/repos/nasa/customapps-release-tracker/contents/release.json")


# check if commit was successful
if [ -z "$commit_response" ]; then
    echo "Commit failed. Exiting script."
    exit 1
fi

echo "Commit successful"
exit 0
