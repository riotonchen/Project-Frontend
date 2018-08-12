from django.urls import path,include,re_path
from django.views.generic import TemplateView

urlpatterns = [
    <%_ if (options.history) { _%>
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    <%_ } else {_%>
    re_path(r'^/?$', TemplateView.as_view(template_name='index.html')),
    <%_ } _%>
]
