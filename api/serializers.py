from rest_framework import serializers
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

class ProductBundleSerializer(serializers.ModelSerializer):
    # CamelCase aliases for frontend compatibility
    priceUSD = serializers.FloatField(source='price_usd')
    originalPriceUSD = serializers.FloatField(source='original_price_usd')
    discountPercent = serializers.IntegerField(source='discount_percent')
    bottlesCount = serializers.IntegerField(source='bottles_count')
    supplyDays = serializers.CharField(source='supply_days')
    bestValue = serializers.BooleanField(source='best_value')
    freeGifts = serializers.JSONField(source='free_gifts')
    reviewsCount = serializers.IntegerField(source='reviews_count')
    inStock = serializers.BooleanField(source='in_stock')
    stockLeft = serializers.IntegerField(source='stock_left')
    id = serializers.CharField(source='slug')

    class Meta:
        model = ProductBundle
        fields = [
            'id',
            'slug',
            'name',
            'subtitle',
            'tag',
            'bottles_count',
            'bottlesCount',
            'supply_days',
            'supplyDays',
            'price_usd',
            'priceUSD',
            'original_price_usd',
            'originalPriceUSD',
            'discount_percent',
            'discountPercent',
            'image',
            'popular',
            'best_value',
            'bestValue',
            'free_gifts',
            'freeGifts',
            'features',
            'rating',
            'reviews_count',
            'reviewsCount',
            'in_stock',
            'inStock',
            'stock_left',
            'stockLeft',
            'display_order',
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    # Aliases for frontend (item.q, item.a)
    q = serializers.CharField(source='question', read_only=True)
    a = serializers.CharField(source='answer', read_only=True)

    class Meta:
        model = FAQ
        fields = ['id', 'category', 'question', 'answer', 'q', 'a', 'display_order']


class BlogArticleSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug')
    readTime = serializers.CharField(source='read_time', read_only=True)
    authorRole = serializers.CharField(source='author_role', read_only=True)
    authorAvatar = serializers.CharField(source='author_avatar', read_only=True)
    keyTakeaways = serializers.JSONField(source='key_takeaways', read_only=True)
    recommendedBundleId = serializers.CharField(source='recommended_bundle_id', read_only=True)

    class Meta:
        model = BlogArticle
        fields = [
            'id',
            'slug',
            'title',
            'category',
            'read_time',
            'readTime',
            'date',
            'author',
            'author_role',
            'authorRole',
            'author_avatar',
            'authorAvatar',
            'image',
            'excerpt',
            'key_takeaways',
            'keyTakeaways',
            'content',
            'recommended_bundle_id',
            'recommendedBundleId',
        ]


class ActiveIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveIngredient
        fields = '__all__'


class BeforeAfterCaseSerializer(serializers.ModelSerializer):
    beforeImage = serializers.CharField(source='before_image', read_only=True)
    afterImage = serializers.CharField(source='after_image', read_only=True)
    bundleUsed = serializers.CharField(source='bundle_used', read_only=True)

    class Meta:
        model = BeforeAfterCase
        fields = [
            'id',
            'name',
            'location',
            'duration',
            'concern',
            'rating',
            'review',
            'before_image',
            'beforeImage',
            'after_image',
            'afterImage',
            'bundle_used',
            'bundleUsed',
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_slug', 'product_name', 'quantity', 'price_usd', 'image']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_id',
            'full_name',
            'phone',
            'email',
            'address',
            'city',
            'postal_code',
            'payment_method',
            'notes',
            'subtotal_usd',
            'discount_usd',
            'total_usd',
            'currency',
            'status',
            'created_at',
            'items'
        ]

    def create(self, validated_data):
        request = self.context.get('request')
        items_data = request.data.get('items', []) if request else []
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_slug=item.get('id', item.get('product_slug', 'bundle')),
                product_name=item.get('name', item.get('product_name', 'FOLLILUXE Product')),
                quantity=item.get('quantity', 1),
                price_usd=item.get('priceUSD', item.get('price_usd', 0.00)),
                image=item.get('image', '')
            )
        return order

