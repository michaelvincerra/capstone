import pytest
from mixer.backend.django import mixer
import re, random

pytestmark = pytest.mark.django_db  # pytestmark allows to write to db.


class TestCountry:
    def test_country(self):
        codes = (
            ('FR', '🇫🇷'),
            ('CH', '🇨🇭'),
            ('DE', '🇩🇪'),
            ('ES', '🇪🇸'),
            ('GB', '🇬🇧'),
            ('IT', '🇮🇹'),
            ('NL', '🇳🇱'),
            ('US', '🇺🇸'),
        )
        choice, flag = random.choice(codes)
        country = mixer.blend('analytics.Country', code=choice)
        match = re.search(r'^[a-zA-Z]{2}', country.code)
        assert country.pk == 1, 'Must save an instance of country.'
        assert bool(match) == True, 'Must return a 2-digit country code.'
        # assert str(country) == country.slug, 'Str must equal a slug'
        # assert isinstance(str(country), str) == True, 'Must return a string.'
        #
        # assert str(country^[\w[A-Z]{2}?) != None, 'Must return something.'



    #
    #
    # def test_init(self):
    #     economicsnapshot = mixer.blend('analytics.EconomicSnapshot', year=2015)
    #     assert economicsnapshot.pk == 1, 'Must save an instance.'
    #
    # def test_str_method(self):
    #     economicsnapshot = mixer.blend('analytics.EconomicSnapshot', year=2015, type='IP')
    #     assert economicsnapshot.pk == 1, 'Must save an instance.'
    #     assert str(economicsnapshot) == economicsnapshot.slug, 'Str Must equal slug.'
    #     assert str(economicsnapshot) != None, 'Must return something.'
    #     assert isinstance(str(economicsnapshot), str) == True, 'Must return a string.'
