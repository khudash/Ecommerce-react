import logging
import threading
from django.conf import settings
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)

def _build_order_email_content(order):
    items = list(order.items.all())
    items_text_lines = []
    items_html_rows = []

    for item in items:
        line = f"- {item.product_name} x {item.quantity} (${item.price_usd})"
        items_text_lines.append(line)
        row = f"""
        <tr>
            <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; word-break: break-word; line-height: 1.35;">
                <strong style="color: #0f172a;">{item.product_name}</strong>
            </td>
            <td style="padding: 10px 6px; border-bottom: 1px solid #e2e8f0; font-size: 12px; text-align: center; color: #475569; white-space: nowrap;">
                x{item.quantity}
            </td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; font-size: 13px; text-align: right; color: #047857; font-weight: 700; white-space: nowrap;">
                ${item.price_usd}
            </td>
        </tr>
        """
        items_html_rows.append(row)

    items_text = "\n".join(items_text_lines) if items_text_lines else "No items recorded"
    items_html = "".join(items_html_rows) if items_html_rows else "<tr><td colspan='3' style='padding: 10px; text-align: center; color: #64748b;'>No items</td></tr>"

    plain_message = f"""
NEW ORDER RECEIVED!
========================================
Order ID: #{order.order_id}
Status: {order.status}
Created At: {order.created_at}

CUSTOMER DETAILS:
----------------------------------------
Full Name: {order.full_name}
Phone: {order.phone}
Email: {order.email or 'N/A'}
Address: {order.address}
City: {order.city}
Postal Code: {order.postal_code or 'N/A'}

ORDER DETAILS:
----------------------------------------
Payment Method: {order.payment_method.upper()}
Customer Notes: {order.notes or 'None'}

ITEMS ORDERED:
----------------------------------------
{items_text}

FINANCIAL SUMMARY:
----------------------------------------
Subtotal: ${order.subtotal_usd} USD
Discount: -${order.discount_usd} USD
Total Amount: ${order.total_usd} ({order.currency})
========================================
    """.strip()

    html_message = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>New Order #{order.order_id}</title>
        <style>
            * {{ box-sizing: border-box; -webkit-text-size-adjust: 100%; }}
            body {{ margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; }}
            @media only screen and (max-width: 600px) {{
                .email-wrapper {{ padding: 8px !important; }}
                .email-card {{ border-radius: 12px !important; }}
                .email-header {{ padding: 20px 16px !important; }}
                .email-content {{ padding: 14px !important; }}
                .card-section {{ padding: 12px !important; margin-bottom: 14px !important; }}
                .label-col {{ width: 80px !important; font-size: 11.5px !important; }}
                .val-col {{ font-size: 12px !important; }}
                .product-th, .product-td {{ font-size: 11.5px !important; padding: 8px 4px !important; }}
            }}
        </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; color: #1e293b;">
        <div class="email-wrapper" style="width: 100%; max-width: 600px; margin: 0 auto; padding: 16px 12px;">
            <div class="email-card" style="width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                
                <!-- Header Banner -->
                <div class="email-header" style="background: linear-gradient(135deg, #053b2c 0%, #047857 100%); padding: 24px 20px; text-align: center; color: #ffffff;">
                    <h1 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">FOLLILUXE</h1>
                    <p style="margin: 0; font-size: 13px; color: #a7f3d0; font-weight: 600;">🛒 New Customer Order Received</p>
                    <div style="display: inline-block; margin-top: 10px; background-color: rgba(255,255,255,0.18); padding: 5px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em;">
                        Order #{order.order_id}
                    </div>
                </div>

                <!-- Content Container -->
                <div class="email-content" style="padding: 20px 18px;">
                    
                    <!-- Customer Details Card -->
                    <div class="card-section" style="background-color: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                        <h3 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #047857; font-weight: 800;">
                            👤 Customer & Delivery Information
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed;">
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Name:</td>
                                <td class="val-col" style="padding: 4px 0; font-weight: 700; color: #0f172a; word-break: break-word;">{order.full_name}</td>
                            </tr>
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Phone:</td>
                                <td class="val-col" style="padding: 4px 0; font-weight: 700; color: #047857; word-break: break-word;">
                                    <a href="tel:{order.phone}" style="color: #047857; text-decoration: none;">{order.phone}</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Email:</td>
                                <td class="val-col" style="padding: 4px 0; color: #334155; word-break: break-word;">{order.email or 'N/A'}</td>
                            </tr>
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Address:</td>
                                <td class="val-col" style="padding: 4px 0; color: #0f172a; font-weight: 600; word-break: break-word; line-height: 1.35;">{order.address}</td>
                            </tr>
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">City:</td>
                                <td class="val-col" style="padding: 4px 0; color: #334155; word-break: break-word;">{order.city} {order.postal_code or ''}</td>
                            </tr>
                            <tr>
                                <td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Payment:</td>
                                <td class="val-col" style="padding: 4px 0; font-weight: 700; color: #d97706; text-transform: uppercase;">{order.payment_method}</td>
                            </tr>
                            {f'<tr><td class="label-col" style="padding: 4px 0; color: #64748b; width: 85px; vertical-align: top; font-size: 12px;">Notes:</td><td class="val-col" style="padding: 4px 0; color: #64748b; font-style: italic; word-break: break-word;">{order.notes}</td></tr>' if order.notes else ''}
                        </table>
                    </div>

                    <!-- Ordered Items Table -->
                    <div class="card-section" style="margin-bottom: 16px;">
                        <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #047857; font-weight: 800;">
                            📦 Ordered Items
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; table-layout: fixed;">
                            <thead>
                                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <th class="product-th" style="padding: 8px; text-align: left; font-size: 11px; color: #64748b; font-weight: 700; width: 62%;">PRODUCT</th>
                                    <th class="product-th" style="padding: 8px 4px; text-align: center; font-size: 11px; color: #64748b; font-weight: 700; width: 14%;">QTY</th>
                                    <th class="product-th" style="padding: 8px; text-align: right; font-size: 11px; color: #64748b; font-weight: 700; width: 24%;">PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                        </table>
                    </div>

                    <!-- Financial Summary Box -->
                    <div class="card-section" style="background-color: #f8fafc; border-radius: 12px; padding: 14px 16px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
                        <table style="width: 100%; font-size: 12.5px; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 3px 0; color: #64748b;">Subtotal:</td>
                                <td style="padding: 3px 0; text-align: right; font-weight: 600; color: #334155;">${order.subtotal_usd} USD</td>
                            </tr>
                            {f'<tr><td style="padding: 3px 0; color: #dc2626;">Discount:</td><td style="padding: 3px 0; text-align: right; font-weight: 600; color: #dc2626;">-${order.discount_usd} USD</td></tr>' if order.discount_usd and float(order.discount_usd) > 0 else ''}
                            <tr style="border-top: 1px solid #cbd5e1;">
                                <td style="padding: 8px 0 0 0; font-size: 14px; font-weight: 800; color: #0f172a;">Total ({order.currency}):</td>
                                <td style="padding: 8px 0 0 0; font-size: 16px; font-weight: 800; text-align: right; color: #047857;">${order.total_usd}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; padding: 10px 0 0 0; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; line-height: 1.4;">
                        FOLLILUXE Automated Order Dispatch System • Customer notification sent to {order.email or order.phone}
                    </div>

                </div>
            </div>
        </div>
    </body>
    </html>
    """.strip()

    return plain_message, html_message


def _dispatch_email(order_id):
    from .models import Order
    try:
        order = Order.objects.prefetch_related('items').filter(id=order_id).first()
        if not order:
            logger.warning(f"Order id {order_id} not found for email notification.")
            return

        recipient_email = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'khudashkhan35@gmail.com')
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@folliluxe.com')
        subject = f"New Order #{order.order_id} Received - {order.full_name} (${order.total_usd})"

        plain_text, html_body = _build_order_email_content(order)

        # Safe logging/printing for Windows terminals (avoid raw unicode crashes)
        print("\n" + "="*60)
        print(f"[ORDER EMAIL NOTIFICATION] Destination: {recipient_email}")
        print(f"Subject: {subject}")
        print("="*60)
        try:
            print(plain_text)
        except Exception:
            print(plain_text.encode('ascii', 'replace').decode('ascii'))
        print("="*60 + "\n")

        msg = EmailMultiAlternatives(
            subject=subject,
            body=plain_text,
            from_email=from_email,
            to=[recipient_email]
        )
        msg.attach_alternative(html_body, "text/html")
        msg.send(fail_silently=False)
        print(f"[SUCCESS] Email processed for {recipient_email} - Order #{order.order_id}")
    except Exception as exc:
        try:
            print(f"[NOTICE] Email dispatch status for Order: {exc}")
        except Exception:
            pass
        logger.exception("Failed to send order notification email")


def send_order_notification_email(order):
    """
    Sends an asynchronous email notification with complete order details
    to the configured admin email (khudashkhan35@gmail.com).
    Never blocks or interrupts the checkout API response.
    """
    thread = threading.Thread(target=_dispatch_email, args=(order.id,), daemon=True)
    thread.start()
