from django.db import models
from django.utils.text import slugify
from .countries import country_codes, FLAGS
# from accounts.models import User


class Country(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    code = models.CharField(max_length=2)
    flag = models.CharField(max_length=5, null=True, blank=True)    #TODO: Verify this works; or use a models. structure?

    def __str__(self):
        return self.name

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
    viewer = models.ManyToManyField(EconomicSnapshot, related_name='collections')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-updated',)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)

        super().save(*args, **kwargs)





                # class analytics(models.Model):
#
#     name = models.CharField(max_length=50)
#     type = models.CharField(max_length=100, choices=INDICATORS)
#     created = models.DateTimeField(auto_now_add=True)
#
#
#     def __str__(self):
#         return self.name
#
# class DataDetail(models.Model):
#
#     """
#     Auto sets the slug field from the name field on save.
#
#     """
#     name = models.CharField(max_length=256)
#     slug = models.SlugField(editable=False, blank=True, null=False)
#
#     def save(self, *args, **kwargs):
#         self.slug = slugify(self.name)
#
#     super().save(*args, **kwargs)