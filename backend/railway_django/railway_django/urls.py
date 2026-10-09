"""
URL configuration for railway_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.http import HttpResponseRedirect, JsonResponse

def custom_dashboard_redirect(request):
    # Django admin is replaced by the custom luxury dashboard
    return HttpResponseRedirect('http://localhost:5173/dashboard')

def admin_disabled_notice(request):
    return JsonResponse({
        "status": "info",
        "message": "Django Admin panel has been disabled and replaced by the FOLLILUXE Custom Dashboard.",
        "dashboard_url": "http://localhost:5173/dashboard"
    })

urlpatterns = [
    # Django default admin removed as requested
    path('admin/', admin_disabled_notice),
    path('dashboard/', custom_dashboard_redirect),
    path('api/', include('api.urls')),
]

