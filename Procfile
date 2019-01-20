release: python manage.py collectstatic --noinput
release: NODE_ENV=development && npm install
web: npm run node
web: python manage.py runserver