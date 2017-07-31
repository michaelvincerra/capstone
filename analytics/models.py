from django.db import models
from django.utils.text import slugify
from .countries import country_codes, FLAGS
from datetime import datetime
# from accounts.models import User


class Country(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    code = models.CharField(max_length=2)
    flag = models.CharField(max_length=5, null=True, blank=True)    #TODO: Verify this works; or use a models. structure?
    # start_year = models.IntegerField()
    # end_year = models.IntegerField()

    def __str__(self):
        return f'{self.name} {self.flag}'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)

        if self.code is None:   # code
            clean_country = self.name.replace('-', ' ').title()
            self.code = country_codes[clean_country]   # code

        self.flag = FLAGS[self.code]
        super().save(*args, **kwargs)


class EconomicSnapshot(models.Model):

    INDICATORS = (
        ('IP', 'Intellectual Property Sales'),
        ('GNI', 'Gross National Income'),
        ('GDP', 'Gross Domestic Product'),
        ('FDI', 'Foreign Direct Investment'),
    )
    # ('PAT', 'Patent Applications'),

    slug = models.SlugField(max_length=50)
    year = models.PositiveSmallIntegerField()
    country = models.ForeignKey(Country, related_name='snapshots')  #Foreign key: many-to-one; from Country, fk: "snapshots"
    type = models.CharField(max_length=30, choices=INDICATORS)
    value = models.FloatField(null=False, blank=True)
    description = models.CharField(max_length=500)
    source_url = models.URLField(null=True, blank=True)

    @property
    def truncate(self):
        return self.description[:30]

    def __str__(self):
        return self.slug

    def save(self, *args, **kwargs):

        descriptor = f'{self.country.code}+{self.type}+{self.year}'
        self.slug = descriptor

        super().save(*args, **kwargs)


class Collection(models.Model):
    title = models.CharField(max_length=100)  # title = title of saved collection.
    updated = models.DateField(auto_now=True)
    slides = models.ManyToManyField(EconomicSnapshot, blank=True)
    start = models.IntegerField(null=True, blank=True)
    end = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ('-updated',)

    def __str__(self):
        queryset = self.slides.all()
        count = queryset.count()
        names_flags = set(es.country for es in queryset)
        result = f'{self.title} {count}|'
        for nf in names_flags:
            result += f' {nf}'
        return result

    def generate_title(self):
        now = datetime.now()

        title_data = set(self.slides.values_list('country__code', 'type'))
        result = ''
        for code, ind in title_data:
            result += f'{code}{ind}|'
        else:
            result += now.year
        self.title = result
        return


    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        queryset = self.slides.all()
        start = max(queryset, key=lambda es: es.year)
        end = min(queryset, key=lambda es: es.year)
        self.start, self.end = start, end
        # self.generate_title()
        super().save(*args, **kwargs)



# Auto sets the slug field from the name field on save.
