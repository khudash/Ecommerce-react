from rest_framework import serializers
from django.utils.text import slugify
import uuid

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
from .email_service import send_order_notification_email

class ProductBundleSerializer(serializers.ModelSerializer):
    # CamelCase aliases for frontend compatibility (marked read_only so writes use internal fields)
    priceUSD = serializers.FloatField(source='price_usd', read_only=True)
    originalPriceUSD = serializers.FloatField(source='original_price_usd', read_only=True)
    discountPercent = serializers.IntegerField(source='discount_percent', read_only=True)
    bottlesCount = serializers.IntegerField(source='bottles_count', read_only=True)
    supplyDays = serializers.CharField(source='supply_days', read_only=True)
    bestValue = serializers.BooleanField(source='best_value', read_only=True)
    freeGifts = serializers.JSONField(source='free_gifts', read_only=True)
    reviewsCount = serializers.IntegerField(source='reviews_count', read_only=True)
    inStock = serializers.BooleanField(source='in_stock', read_only=True)
    stockLeft = serializers.IntegerField(source='stock_left', read_only=True)
    id = serializers.CharField(source='slug', read_only=True)
    db_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = ProductBundle
        fields = [
            'id',
            'db_id',
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
            'created_at',
        ]
        read_only_fields = ['created_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        mapping = {
            'priceUSD': 'price_usd',
            'originalPriceUSD': 'original_price_usd',
            'discountPercent': 'discount_percent',
            'bottlesCount': 'bottles_count',
            'supplyDays': 'supply_days',
            'bestValue': 'best_value',
            'freeGifts': 'free_gifts',
            'reviewsCount': 'reviews_count',
            'inStock': 'in_stock',
            'stockLeft': 'stock_left',
            'displayOrder': 'display_order',
        }
        for camel, snake in mapping.items():
            if camel in data and snake not in data:
                data[snake] = data[camel]

        if not data.get('slug') and data.get('name'):
            base_slug = slugify(data['name'])
            data['slug'] = base_slug if base_slug else f"bundle-{uuid.uuid4().hex[:6]}"

        return super().to_internal_value(data)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['created_at']


class FAQSerializer(serializers.ModelSerializer):
    # Aliases for frontend (item.q, item.a)
    q = serializers.CharField(source='question', read_only=True)
    a = serializers.CharField(source='answer', read_only=True)

    class Meta:
        model = FAQ
        fields = ['id', 'category', 'question', 'answer', 'q', 'a', 'display_order', 'created_at']
        read_only_fields = ['created_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'q' in data and 'question' not in data:
            data['question'] = data['q']
        if 'a' in data and 'answer' not in data:
            data['answer'] = data['a']
        return super().to_internal_value(data)


class BlogArticleSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug', read_only=True)
    db_id = serializers.IntegerField(source='id', read_only=True)
    readTime = serializers.CharField(source='read_time', read_only=True)
    authorRole = serializers.CharField(source='author_role', read_only=True)
    authorAvatar = serializers.CharField(source='author_avatar', read_only=True)
    keyTakeaways = serializers.JSONField(source='key_takeaways', read_only=True)
    recommendedBundleId = serializers.CharField(source='recommended_bundle_id', read_only=True)

    class Meta:
        model = BlogArticle
        fields = [
            'id',
            'db_id',
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
            'created_at',
        ]
        read_only_fields = ['created_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        mapping = {
            'readTime': 'read_time',
            'authorRole': 'author_role',
            'authorAvatar': 'author_avatar',
            'keyTakeaways': 'key_takeaways',
            'recommendedBundleId': 'recommended_bundle_id',
        }
        for camel, snake in mapping.items():
            if camel in data and snake not in data:
                data[snake] = data[camel]

        if not data.get('slug') and data.get('title'):
            base_slug = slugify(data['title'])
            data['slug'] = base_slug if base_slug else f"article-{uuid.uuid4().hex[:6]}"

        return super().to_internal_value(data)


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
            'display_order',
        ]

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        mapping = {
            'beforeImage': 'before_image',
            'afterImage': 'after_image',
            'bundleUsed': 'bundle_used',
            'displayOrder': 'display_order',
        }
        for camel, snake in mapping.items():
            if camel in data and snake not in data:
                data[snake] = data[camel]
        return super().to_internal_value(data)


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
        read_only_fields = ['created_at']

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
        send_order_notification_email(order)
        return order
