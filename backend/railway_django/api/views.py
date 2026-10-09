from django.shortcuts import get_object_or_404
from django.db.models import Sum, Avg, Count
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import (
    ProductBundle,
    Review,
    FAQ,
    BlogArticle,
    ActiveIngredient,
    BeforeAfterCase,
    Order,
    OrderItem
)
from .serializers import (
    ProductBundleSerializer,
    ReviewSerializer,
    FAQSerializer,
    BlogArticleSerializer,
    ActiveIngredientSerializer,
    BeforeAfterCaseSerializer,
    OrderSerializer
)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        lookup_val = self.kwargs.get('pk')
        if not lookup_val:
            return super().get_object()
        
        # Check by integer ID first if numeric
        if str(lookup_val).isdigit():
            obj = Order.objects.filter(id=int(lookup_val)).first()
            if obj:
                return obj
        
        # Otherwise search by order_id (e.g. FLX-17284)
        obj = Order.objects.filter(order_id=str(lookup_val)).first()
        if obj:
            return obj
        
        return get_object_or_404(Order, order_id=lookup_val)


class ProductBundleViewSet(viewsets.ModelViewSet):
    queryset = ProductBundle.objects.all().order_by('display_order', 'id')
    serializer_class = ProductBundleSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        lookup_val = self.kwargs.get('pk')
        if not lookup_val:
            return super().get_object()
        
        if str(lookup_val).isdigit():
            obj = ProductBundle.objects.filter(id=int(lookup_val)).first()
            if obj:
                return obj
        
        obj = ProductBundle.objects.filter(slug=str(lookup_val)).first()
        if obj:
            return obj
        
        return get_object_or_404(ProductBundle, slug=lookup_val)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-id')
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]


class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all().order_by('display_order', 'id')
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]


class BlogArticleViewSet(viewsets.ModelViewSet):
    queryset = BlogArticle.objects.all().order_by('-id')
    serializer_class = BlogArticleSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        lookup_val = self.kwargs.get('pk')
        if not lookup_val:
            return super().get_object()
        
        if str(lookup_val).isdigit():
            obj = BlogArticle.objects.filter(id=int(lookup_val)).first()
            if obj:
                return obj
        
        obj = BlogArticle.objects.filter(slug=str(lookup_val)).first()
        if obj:
            return obj
        
        return get_object_or_404(BlogArticle, slug=lookup_val)


class ActiveIngredientViewSet(viewsets.ModelViewSet):
    queryset = ActiveIngredient.objects.all().order_by('display_order', 'id')
    serializer_class = ActiveIngredientSerializer
    permission_classes = [AllowAny]


class BeforeAfterCaseViewSet(viewsets.ModelViewSet):
    queryset = BeforeAfterCase.objects.all().order_by('display_order', 'id')
    serializer_class = BeforeAfterCaseSerializer
    permission_classes = [AllowAny]


class DashboardStatsAPIView(APIView):
    """
    Returns live aggregated business and catalog metrics for the custom executive dashboard.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        total_orders = Order.objects.count()
        total_revenue_usd = Order.objects.aggregate(total=Sum('total_usd'))['total'] or 0.00

        pending_orders = Order.objects.filter(status__iexact='Pending').count()
        processing_orders = Order.objects.filter(status__iexact='Processing').count()
        shipped_orders = Order.objects.filter(status__iexact='Shipped').count()
        delivered_orders = Order.objects.filter(status__iexact='Delivered').count()
        cancelled_orders = Order.objects.filter(status__iexact='Cancelled').count()

        total_products = ProductBundle.objects.count()
        in_stock_products = ProductBundle.objects.filter(in_stock=True).count()
        low_stock_products = ProductBundle.objects.filter(in_stock=True, stock_left__lte=10).count()

        total_reviews = Review.objects.count()
        avg_rating = Review.objects.aggregate(avg=Avg('rating'))['avg'] or 5.0

        total_faqs = FAQ.objects.count()
        total_blogs = BlogArticle.objects.count()
        total_ingredients = ActiveIngredient.objects.count()
        total_transformations = BeforeAfterCase.objects.count()

        recent_orders = Order.objects.all().order_by('-created_at')[:5]
        recent_reviews = Review.objects.all().order_by('-id')[:5]

        return Response({
            "metrics": {
                "total_orders": total_orders,
                "total_revenue_usd": float(total_revenue_usd),
                "pending_orders": pending_orders,
                "processing_orders": processing_orders,
                "shipped_orders": shipped_orders,
                "delivered_orders": delivered_orders,
                "cancelled_orders": cancelled_orders,
                "total_products": total_products,
                "in_stock_products": in_stock_products,
                "low_stock_products": low_stock_products,
                "total_reviews": total_reviews,
                "avg_rating": round(float(avg_rating), 1),
                "total_faqs": total_faqs,
                "total_blogs": total_blogs,
                "total_ingredients": total_ingredients,
                "total_transformations": total_transformations,
            },
            "recent_orders": OrderSerializer(recent_orders, many=True).data,
            "recent_reviews": ReviewSerializer(recent_reviews, many=True).data,
        })


class HomePageAPIView(APIView):
    """
    Consolidated endpoint returning all data needed for the Home Page
    in a single, fast REST API call.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        products = ProductBundle.objects.all()
        reviews = Review.objects.all()
        faqs = FAQ.objects.all()
        blogs = BlogArticle.objects.all()
        ingredients = ActiveIngredient.objects.all()
        transformations = BeforeAfterCase.objects.all()

        return Response({
            "products": ProductBundleSerializer(products, many=True).data,
            "reviews": ReviewSerializer(reviews, many=True).data,
            "faqs": FAQSerializer(faqs, many=True).data,
            "blogs": BlogArticleSerializer(blogs, many=True).data,
            "ingredients": ActiveIngredientSerializer(ingredients, many=True).data,
            "transformations": BeforeAfterCaseSerializer(transformations, many=True).data,
        })
