
import pytest
pytest = pytest.mark.django_db
from accounts import forms


class TestCustomUserCreationForm:
    def test_form(self):
        form = forms.CustomUserCreationForm(data={})
        assert form.is_valid() is False, "Must be invalid if not data is given."

        data  = {'nickname': '..............'}
        form = forms.CustomUserCreationForm(data=data)
        assert form.is_valid() is False, 'Must be invalid if nickname is all punctuation.'
        assert 'nickname' in form.errors, 'Must return field error for nickname.'

        data = {'nickname': 'llamas42'}
        form = forms.CustomUserCreationForm(data=data)
        assert form.is_valid() is True, 'Must be valid when data is given.'
