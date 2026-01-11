// ========================================
// Karibu Groceries – Procurement Form
// ========================================

// ANSI COLORS
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

// LOGGER
function log(level, color, message) {
  const time = new Date().toLocaleTimeString();
  console.log(
    `${COLORS.gray}[${time}]${COLORS.reset} ${color}${COLORS.bold}[${level}]${COLORS.reset} ${message}`
  );
}

const Logger = {
  info: (msg) => log('INFO', COLORS.cyan, msg),
  success: (msg) => log('SUCCESS', COLORS.green, msg),
  warn: (msg) => log('WARN', COLORS.yellow, msg),
  error: (msg) => log('ERROR', COLORS.red, msg),
};

// ERROR HANDLER
function handleError(field, message) {
  Logger.error(`${field}: ${message}`);
}

// KARIBU PROCUREMENT FORM
function submitKaribuProcurement(form) {
  Logger.info('Submitting Karibu Groceries procurement request...');

  if (!form.productName) {
    return handleError('Product Name', 'Product name is required');
  }

  if (!form.supplier) {
    return handleError('Supplier', 'Supplier name is required');
  }

  if (!form.warehouse) {
    return handleError('Warehouse', 'Warehouse location is required');
  }

  if (typeof form.quantity !== 'number' || form.quantity <= 0) {
    return handleError('Quantity', 'Quantity must be a positive number');
  }

  if (typeof form.unitPrice !== 'number' || form.unitPrice <= 0) {
    return handleError('Unit Price', 'Unit price must be greater than zero');
  }

  if (!form.deliveryDate || new Date(form.deliveryDate) <= new Date()) {
    return handleError('Delivery Date', 'Delivery date must be in the future');
  }

  const totalCost = form.quantity * form.unitPrice;
  const MONTHLY_BUDGET = 10000;

  if (totalCost > MONTHLY_BUDGET) {
    return handleError(
      'Budget',
      `Order cost ($${totalCost}) exceeds Karibu monthly budget ($${MONTHLY_BUDGET})`
    );
  }

  Logger.success('Procurement request approved!');
  Logger.info(`Product: ${form.productName}`);
  Logger.info(`Supplier: ${form.supplier}`);
  Logger.info(`Warehouse: ${form.warehouse}`);
  Logger.info(`Quantity: ${form.quantity}`);
  Logger.info(`Total Cost: $${totalCost}`);
}

// =====================
// TEST CASES (SIMULATION)
// =====================

submitKaribuProcurement({
  productName: '',
  supplier: 'FreshFarm Ltd',
  warehouse: 'Nairobi Central',
  quantity: 100,
  unitPrice: 2,
  deliveryDate: '2026-01-01',
});

submitKaribuProcurement({
  productName: 'Rice 5kg',
  supplier: '',
  warehouse: 'Nairobi Central',
  quantity: 50,
  unitPrice: 10,
  deliveryDate: '2026-01-01',
});

submitKaribuProcurement({
  productName: 'Cooking Oil',
  supplier: 'Golden Oils',
  warehouse: 'Westlands Store',
  quantity: -5,
  unitPrice: 8,
  deliveryDate: '2026-01-01',
});

submitKaribuProcurement({
  productName: 'Sugar',
  supplier: 'Sweet Suppliers',
  warehouse: 'Eastlands Store',
  quantity: 200,
  unitPrice: 60,
  deliveryDate: '2026-01-01',
});

submitKaribuProcurement({
  productName: 'Milk Packs',
  supplier: 'DairyBest',
  warehouse: 'Nairobi Central',
  quantity: 300,
  unitPrice: 3,
  deliveryDate: '2026-01-01',
});
