# test_views.py #

from django.test import RequestFactory
from analytics.views import home


class TestHome:
    def test_anonymous(self):
        req = RequestFactory().get('/')
        resp = home()(req)
        assert resp.status_code == 200, 'Must be callable  by anyone. '