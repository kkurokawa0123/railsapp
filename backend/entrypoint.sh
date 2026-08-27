#!/bin/bash
set -e

rm -f /todoapp/tmp/pids/server.pid

exec "$@"