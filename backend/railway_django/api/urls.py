from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductBundleViewSet,
    ReviewViewSet,
    FAQViewSet,
    BlogArticleViewSet,
    ActiveIngredientViewSet,
    BeforeAfterCaseViewSet,
    OrderViewSet,
    HomePageAPIView,
    DashboardStatsAPIView,
)

router = DefaultRouter()
router.register(r'products', ProductBundleViewSet, basename='product')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'blogs', BlogArticleViewSet, basename='blog')
router.register(r'ingredients', ActiveIngredientViewSet, basename='ingredient')
router.register(r'transformations', BeforeAfterCaseViewSet, basename='transformation')
router.register(r'orders', OrderViewSet, basename='order')


urlpatterns = [
    path('home/', HomePageAPIView.as_view(), name='home-page-data'),
    path('dashboard/stats/', DashboardStatsAPIView.as_view(), name='dashboard-stats'),
    path('', include(router.urls)),
]
