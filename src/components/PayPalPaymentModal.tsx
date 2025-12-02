import { useState, useEffect } from 'react';
import '../styles.css';

interface PayPalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  currency: string;
  capacity: number;
  onPaymentSuccess?: (orderDetails: Record<string, unknown>) => void;
}

interface PayPal {
  Buttons: (config: Record<string, unknown>) => {
    render: (selector: string) => void;
  };
}

declare global {
  interface Window {
    paypal?: PayPal;
  }
}

function PayPalPaymentModal({
  isOpen,
  onClose,
  title,
  price,
  currency,
  capacity,
  onPaymentSuccess,
}: PayPalPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.querySelector<HTMLScriptElement>(
      'script[src^="https://www.paypal.com/sdk/js"]'
    );

    const handleLoad = () => {
      setPaypalLoaded(true);
    };

    if (script) {
      script.addEventListener('load', handleLoad);
    }

    return () => {
      if (script) {
        script.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !paypalLoaded) return;

    // Check if PayPal is loaded
    if (window.paypal) {
      // Render PayPal buttons
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }

      const buttons = window.paypal.Buttons({
        createOrder: (
          _data: unknown,
          actions: {
            order: {
              create: (config: Record<string, unknown>) => Promise<string>;
            };
          }
        ) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: price.toFixed(2),
                },
                description: `${title} - Capacity: ${capacity} people`,
              },
            ],
          });
        },
        onApprove: async (
          data: { orderID: string },
          actions: {
            order: { capture: () => Promise<Record<string, unknown>> };
          }
        ) => {
          setIsProcessing(true);
          try {
            const orderDetails = await actions.order.capture();
            console.log('Payment successful:', orderDetails);

            // Show success message
            alert(`Payment successful! Order ID: ${data.orderID}`);

            // Call success callback if provided
            if (onPaymentSuccess) {
              onPaymentSuccess(orderDetails);
            }

            onClose();
          } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
          } finally {
            setIsProcessing(false);
          }
        },
        onError: (err: Record<string, unknown>) => {
          console.error('PayPal error:', err);
          alert('An error occurred during payment. Please try again.');
          setIsProcessing(false);
        },
        onCancel: () => {
          console.log('Payment cancelled');
          setIsProcessing(false);
        },
      });

      buttons.render('#paypal-button-container');
    } else {
      console.warn(
        'PayPal SDK not loaded. Make sure to add client ID to index.html'
      );
    }
  }, [
    isOpen,
    paypalLoaded,
    currency,
    price,
    title,
    capacity,
    onClose,
    onPaymentSuccess,
  ]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '105vh',
        transform: 'translateY(-5vh)',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1050,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3 p-5 shadow-lg"
        style={{
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Complete Your Booking</h4>
          <button
            className="btn-close"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close"
          ></button>
        </div>

        {/* Booking Details */}
        <div className="border-bottom pb-3 mb-4">
          <h5 className="fw-semibold mb-3">{title}</h5>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Capacity:</span>
            <span className="fw-semibold">{capacity} people</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Duration:</span>
            <span className="fw-semibold">1 day</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-3 mt-3">
            <span className="fw-bold">Total Price:</span>
            <span
              className="fw-bold text-success"
              style={{ fontSize: '1.5rem' }}
            >
              {currency} ${price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="alert alert-info mb-4" role="alert">
          <small>Secure payment powered by PayPal</small>
        </div>

        {/* PayPal Button Container */}
        {paypalLoaded ? (
          <div id="paypal-button-container" className="mb-3"></div>
        ) : (
          <div className="alert alert-warning mb-3">
            <small>
              PayPal is not configured. Please add your Client ID to index.html
            </small>
          </div>
        )}

        {/* Cancel Button */}
        <button
          className="btn btn-secondary w-100"
          onClick={onClose}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}

export default PayPalPaymentModal;
