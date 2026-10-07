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
    Order
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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    lookup_field = 'order_id'


class ProductBundleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProductBundle.objects.all()
    serializer_class = ProductBundleSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]


class BlogArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogArticle.objects.all()
    serializer_class = BlogArticleSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class ActiveIngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ActiveIngredient.objects.all()
    serializer_class = ActiveIngredientSerializer
    permission_classes = [AllowAny]


class BeforeAfterCaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BeforeAfterCase.objects.all()
    serializer_class = BeforeAfterCaseSerializer
    permission_classes = [AllowAny]


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
