from django.contrib import admin
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

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_slug', 'product_name', 'quantity', 'price_usd')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'full_name', 'phone', 'city', 'total_usd', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order_id', 'full_name', 'phone', 'email', 'address', 'city')
    inlines = [OrderItemInline]
    readonly_fields = ('created_at',)


@admin.register(ProductBundle)
class ProductBundleAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'price_usd', 'bottles_count', 'popular', 'best_value', 'in_stock')
    list_filter = ('popular', 'best_value', 'in_stock')
    search_fields = ('name', 'subtitle', 'tag')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'rating', 'bundle', 'location', 'verified', 'helpful')
    list_filter = ('rating', 'verified')
    search_fields = ('author', 'title', 'content')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'display_order')
    list_filter = ('category',)
    search_fields = ('question', 'answer')


@admin.register(BlogArticle)
class BlogArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'category', 'author', 'date')
    list_filter = ('category',)
    search_fields = ('title', 'excerpt')


@admin.register(ActiveIngredient)
class ActiveIngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'badge', 'stat', 'display_order')
    search_fields = ('name', 'role', 'description')


@admin.register(BeforeAfterCase)
class BeforeAfterCaseAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'duration', 'concern', 'rating')

