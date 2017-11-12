# If you have OpenSSL installed, we recommend updating
# the following line to use "https"
source 'http://rubygems.org'

gem "rouge", "1.7.2"

gem "middleman", "~> 4.1.2"

# For syntax highlighting
gem "middleman-syntax", ">= 2.1.0"

# Plugin for middleman to generate Github pages
gem 'middleman-gh-pages'

# Live-reloading plugin
gem "middleman-livereload", "~> 3.4.1"

gem 'redcarpet', '~> 3.2.3'

# For faster file watcher updates on Windows:
gem "wdm", "~> 0.1.0", :platforms => [:mswin, :mingw]

# Cross-templating language block fix for Ruby 1.8
platforms :mri_18 do
  gem "ruby18_source_location"
end

gem "rake", "~> 10.4.0"

gem 'therubyracer', :platforms => :ruby