from django.db import models

class ProductBundle(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    tag = models.CharField(max_length=100, blank=True)
    bottles_count = models.PositiveIntegerField(default=1)
    supply_days = models.CharField(max_length=100)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    original_price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percent = models.PositiveIntegerField(default=0)
    image = models.CharField(max_length=500, blank=True)
    popular = models.BooleanField(default=False)
    best_value = models.BooleanField(default=False)
    free_gifts = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    rating = models.FloatField(default=5.0)
    reviews_count = models.PositiveIntegerField(default=0)
    in_stock = models.BooleanField(default=True)
    stock_left = models.PositiveIntegerField(default=10)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return self.name


class Review(models.Model):
    author = models.CharField(max_length=255)
    role = models.CharField(max_length=255, default='Verified Buyer')
    location = models.CharField(max_length=255, blank=True)
    rating = models.PositiveIntegerField(default=5)
    date = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    verified = models.BooleanField(default=True)
    helpful = models.PositiveIntegerField(default=0)
    bundle = models.CharField(max_length=255, default='3-Month Clinical Regrowth Kit')
    avatar = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.author} - {self.rating} stars"


class FAQ(models.Model):
    category = models.CharField(max_length=100)
    question = models.CharField(max_length=500)
    answer = models.TextField()
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return self.question


class BlogArticle(models.Model):
    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    read_time = models.CharField(max_length=50)
    date = models.CharField(max_length=100)
    author = models.CharField(max_length=255)
    author_role = models.CharField(max_length=255)
    author_avatar = models.CharField(max_length=10, blank=True)
    image = models.CharField(max_length=500)
    excerpt = models.TextField()
    key_takeaways = models.JSONField(default=list, blank=True)
    content = models.JSONField(default=list, blank=True)
    recommended_bundle_id = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title


class ActiveIngredient(models.Model):
    name = models.CharField(max_length=255)
    badge = models.CharField(max_length=100)
    origin = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    description = models.TextField()
    stat = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default='Sparkles')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return self.name


class BeforeAfterCase(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    concern = models.CharField(max_length=255)
    rating = models.PositiveIntegerField(default=5)
    review = models.TextField()
    before_image = models.CharField(max_length=500)
    after_image = models.CharField(max_length=500)
    bundle_used = models.CharField(max_length=255)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return self.name


class Order(models.Model):
    order_id = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=30, blank=True)
    payment_method = models.CharField(max_length=50, default='cod')
    notes = models.TextField(blank=True)
    subtotal_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_usd = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='PKR')
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.order_id} - {self.full_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product_slug = models.CharField(max_length=100)
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"

