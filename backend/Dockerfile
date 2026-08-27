FROM ruby:3.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /todoapp
COPY Gemfile /todoapp/Gemfile
COPY Gemfile.lock /todoapp/Gemfile.lock
RUN bundle install
COPY . /todoapp

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
# Cron Job実行のため一旦コメントアウト ENTRYPOINT
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]