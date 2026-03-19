const STORAGE_KEY = 'phongtro_full_data_v1';
const CONFIG_KEY = 'phongtro_config_v1';
const defaultConfig = { defaultUnitPrice: 4000, defaultWaterPrice: 10000, defaultService: 500000 };
const defaultData = {
  rooms: [
    { id: 1, room: '201', status: 'Đã chốt', rent: 4300000, service: 700000, water: 300000, electricFee: 0, deposit: 4300000, paid: 4300000, people: 3, note: 'HĐ 6 tháng' },
    { id: 2, room: '202', status: 'Đã chốt', rent: 4500000, service: 500000, water: 200000, electricFee: 0, deposit: 4500000, paid: 4500000, people: 2, note: '' },
    { id: 3, room: '203', status: 'Đã chốt', rent: 5500000, service: 500000, water: 200000, electricFee: 0, deposit: 5500000, paid: 5600000, people: 3, note: '' },
    { id: 4, room: '301', status: 'Đã chốt', rent: 4300000, service: 700000, water: 300000, electricFee: 0, deposit: 4300000, paid: 4300000, people: 2, note: 'Đầu T9 thu nốt' }
  ],
  electric: [
    { id: 1, month: '2026-04', room: '201', prev: 762, curr: 858, unitPrice: 4000, amount: 384000, note: '' },
    { id: 2, month: '2026-04', room: '202', prev: 853, curr: 933, unitPrice: 4000, amount: 320000, note: '' },
    { id: 3, month: '2026-04', room: '203', prev: 952, curr: 1119, unitPrice: 4000, amount: 668000, note: '' }
  ],
  cash: [
    { id: 1, date: '2026-03-01', type: 'Thu', amount: 4300000, note: 'Thu 201' },
    { id: 2, date: '2026-03-02', type: 'Chi', amount: 1000000, note: 'Mua vật tư' }
  ]
};

const tabButtons = [...document.querySelectorAll('.tab-btn')];
const menuButtons = [...document.querySelectorAll('.menu-btn')];
const sections = {
  rooms: document.getElementById('rooms'),
  electric: document.getElementById('electric'),
  cash: document.getElementById('cash'),
  report: document.getElementById('report')
};

const invoiceModal = document.getElementById('invoiceModal');
const invoiceBody = document.getElementById('invoiceBody');
const closeInvoice = document.getElementById('closeInvoice');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');

const addRoomBtn = document.getElementById('addRoomBtn');
const addElectricBtn = document.getElementById('addElectricBtn');
const addCashBtn = document.getElementById('addCashBtn');
const exportBtn = document.getElementById('exportBtn');
const exportExcelBtn = document.getElementById('exportExcelBtn');
const resetBtn = document.getElementById('resetBtn');
const importFile = document.getElementById('importFile');
const importExcelFile = document.getElementById('importExcelFile');
const defaultUnitPriceInput = document.getElementById('defaultUnitPrice');
const defaultWaterPriceInput = document.getElementById('defaultWaterPrice');
const defaultServiceInput = document.getElementById('defaultService');
const saveConfigBtn = document.getElementById('saveConfig');

const roomTableWrapper = document.getElementById('roomTableWrapper');
const electricTableWrapper = document.getElementById('electricTableWrapper');
const cashTableWrapper = document.getElementById('cashTableWrapper');
const reportContent = document.getElementById('reportContent');
const stats = document.getElementById('stats');

const roomForm = document.getElementById('roomForm');
const electricForm = document.getElementById('electricForm');
const cashForm = document.getElementById('cashForm');

const roomFormTitle = document.getElementById('roomFormTitle');
const electricFormTitle = document.getElementById('electricFormTitle');
const cashFormTitle = document.getElementById('cashFormTitle');

const current = { roomId: null, electricId: null, cashId: null };



const fields = {
  roomName: document.getElementById('roomName'),
  status: document.getElementById('status'),
  rent: document.getElementById('rent'),
  service: document.getElementById('service'),
  water: document.getElementById('water'),
  electricFee: document.getElementById('electric'),
  deposit: document.getElementById('deposit'),
  paid: document.getElementById('paid'),
  people: document.getElementById('people'),
  note: document.getElementById('note'),
  month: document.getElementById('month'),
  electricRoom: document.getElementById('electricRoom'),
  prev: document.getElementById('prev'),
  curr: document.getElementById('curr'),
  unitPrice: document.getElementById('unitPrice'),
  electricNote: document.getElementById('electricNote'),
  cashDate: document.getElementById('cashDate'),
  cashType: document.getElementById('cashType'),
  cashAmount: document.getElementById('cashAmount'),
  cashNote: document.getElementById('cashNote'),
  cashRoom: document.getElementById('cashRoom')
};

const electricImage = document.getElementById('electricImage');
const cashImage = document.getElementById('cashImage');
const scanElectricBtn = document.getElementById('scanElectric');
const scanCashBtn = document.getElementById('scanCash');


let data = load();
let config = loadConfig();
applyConfigToUI();

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultData);
  try { return JSON.parse(raw); } catch { return structuredClone(defaultData); }
}

function loadConfig() {
  const raw = localStorage.getItem(CONFIG_KEY);
  if (!raw) return structuredClone(defaultConfig);
  try { return JSON.parse(raw); } catch { return structuredClone(defaultConfig); }
}

function saveConfig() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  applyConfigToUI();
}

function applyConfigToUI() {
  defaultUnitPriceInput.value = config.defaultUnitPrice;
  defaultWaterPriceInput.value = config.defaultWaterPrice;
  defaultServiceInput.value = config.defaultService;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderAll();
}


function showTab(tab) {
  tabButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
  menuButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
  Object.entries(sections).forEach(([k, s]) => s.classList.toggle('hidden', k !== tab));
}

tabButtons.forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
menuButtons.forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));

function formatMoney(v) {
  return Number(v || 0).toLocaleString();
}

function renderStats() {
  const totalRooms = data.rooms.length;
  const totalRent = data.rooms.reduce((s, r) => s + Number(r.rent || 0), 0);
  const totalPaid = data.rooms.reduce((s, r) => s + Number(r.paid || 0), 0);
  const totalDue = data.rooms.reduce(
    (s, r) => s + ((Number(r.rent || 0) + Number(r.service || 0) + Number(r.water || 0) + Number(r.electricFee || 0)) - Number(r.paid || 0)),
    0
  );
  stats.innerHTML = `<div class='stat'><strong>${totalRooms}</strong><br>Phòng</div><div class='stat'><strong>${formatMoney(totalRent)} ₫</strong><br>Tiền phòng</div><div class='stat'><strong>${formatMoney(totalPaid)} ₫</strong><br>Đã thu</div><div class='stat'><strong>${formatMoney(totalDue)} ₫</strong><br>Còn thiếu</div>`;
}

function renderRooms() {
  const rows = data.rooms
    .map((r, i) => {
      const total = Number(r.rent || 0) + Number(r.service || 0) + Number(r.water || 0) + Number(r.electricFee || 0);
      const balance = Number(r.paid || 0) - total;
      return `<tr><td>${i + 1}</td><td>${r.room}</td><td>${r.status}</td><td>${formatMoney(r.rent)}</td><td>${formatMoney(r.service)}</td><td>${formatMoney(r.water)}</td><td>${formatMoney(r.electricFee)}</td><td>${formatMoney(r.deposit)}</td><td>${formatMoney(r.paid)}</td><td>${formatMoney(total)}</td><td>${formatMoney(balance)}</td><td>${r.people}</td><td>${r.note || ''}</td><td><button onclick='editRoom(${r.id})'>Sửa</button> <button onclick='deleteRoom(${r.id})'>Xóa</button> <button onclick='printInvoice(${r.id})'>Hóa đơn</button></td></tr>`;
    })
    .join('');

  roomTableWrapper.innerHTML = `<table><thead><tr><th>#</th><th>Phòng</th><th>Trạng thái</th><th>Tiền phòng</th><th>Dịch vụ</th><th>Nước</th><th>Điện</th><th>Cọc</th><th>Đã nộp</th><th>Tổng</th><th>Chênh</th><th>Người</th><th>Ghi chú</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderElectric() {
  const rows = data.electric
    .map((e, i) => {
      return `<tr><td>${i + 1}</td><td>${e.month}</td><td>${e.room}</td><td>${e.prev}</td><td>${e.curr}</td><td>${e.curr - e.prev}</td><td>${formatMoney(e.unitPrice)}</td><td>${formatMoney(e.amount)}</td><td>${e.note || ''}</td><td><button onclick='editElectric(${e.id})'>Sửa</button> <button onclick='deleteElectric(${e.id})'>Xóa</button></td></tr>`;
    })
    .join('');

  electricTableWrapper.innerHTML = `<table><thead><tr><th>#</th><th>Tháng</th><th>Phòng</th><th>Số trước</th><th>Số sau</th><th>Tổng số</th><th>Đơn giá</th><th>Thành tiền</th><th>Ghi chú</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderCash() {
  const rows = data.cash
    .map((c, i) => {
      return `<tr><td>${i + 1}</td><td>${c.date}</td><td><span class='badge ${c.type === 'Thu' ? 'badge-thu' : 'badge-chi'}'>${c.type}</span></td><td>${formatMoney(c.amount)}</td><td>${c.note}</td><td>${c.room || ''}</td><td><button onclick='editCash(${c.id})'>Sửa</button> <button onclick='deleteCash(${c.id})'>Xóa</button></td></tr>`;
    })
    .join('');

  cashTableWrapper.innerHTML = `<table><thead><tr><th>#</th><th>Ngày</th><th>Loại</th><th>Số tiền</th><th>Nội dung</th><th>Phòng</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderReport() {
  const totalIn = data.cash.filter((c) => c.type === 'Thu').reduce((s, c) => s + Number(c.amount || 0), 0);
  const totalOut = data.cash.filter((c) => c.type === 'Chi').reduce((s, c) => s + Number(c.amount || 0), 0);
  const profit = totalIn - totalOut;
  const totalElectric = data.electric.reduce((s, e) => s + Number(e.amount || 0), 0);

  reportContent.innerHTML = `
    <div class='stat'><strong>${data.rooms.length}</strong><br>Số phòng</div>
    <div class='stat'><strong>${formatMoney(totalIn)} ₫</strong><br>Tổng thu</div>
    <div class='stat'><strong>${formatMoney(totalOut)} ₫</strong><br>Tổng chi</div>
    <div class='stat'><strong>${formatMoney(profit)} ₫</strong><br>Lợi nhuận</div>
    <div class='stat'><strong>${formatMoney(totalElectric)} ₫</strong><br>Tổng điện</div>
  `;
}

function mapColumns(row, colMap) {
  const entry = {};
  for (const [k, v] of Object.entries(colMap)) {
    const keys = Array.isArray(v) ? v : [v];
    for (const key of keys) {
      if (row[key] !== undefined) {
        entry[k] = row[key];
        break;
      }
    }
  }
  return entry;
}

function nextId(list) {
  return list.reduce((max, item) => Math.max(max, Number(item.id || 0)), 0) + 1;
}

function parseExcelSheet(ws) {
  return XLSX.utils.sheet_to_json(ws, { defval: '' });
}

function parseNumberFromText(value) {
  const num = String(value).replace(/[^0-9\.,]/g, '').replace(/,/g, '');
  const n = Number(num);
  return Number.isNaN(n) ? 0 : n;
}

function parseExcelDate(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
    const [d, m, y] = text.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return text;
}

function ocrRecognizeFile(file, callback) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const { data: { text } } = await Tesseract.recognize(e.target.result, 'vie');
      callback(text);
    } catch (err) {
      alert('OCR lỗi: ' + err.message);
    }
  };
  reader.readAsDataURL(file);
}

function autoFillElectricFromText(text) {
  const mMonth = text.match(/(\d{4}-\d{2})/);
  const mRoom = text.match(/phòng\s*([0-9]+)/i);
  const mPrev = text.match(/số trước\s*[:\s]*([0-9]+)/i);
  const mCurr = text.match(/số sau\s*[:\s]*([0-9]+)/i);
  fields.month.value = mMonth ? mMonth[1] : fields.month.value;
  fields.electricRoom.value = mRoom ? mRoom[1] : fields.electricRoom.value;
  fields.prev.value = mPrev ? mPrev[1] : fields.prev.value;
  fields.curr.value = mCurr ? mCurr[1] : fields.curr.value;
  const mUnit = text.match(/đơn giá\s*[:\s]*([0-9.,]+)/i);
  fields.unitPrice.value = mUnit ? parseNumberFromText(mUnit[1]) : config.defaultUnitPrice;
}

function autoFillCashFromText(text) {
  const mDate = text.match(/(\d{4}-\d{2}-\d{2})/);
  const mType = text.match(/(Thu|Chi)/i);
  const mAmount = text.match(/([0-9.,]+)\s*(đ|d|vnđ)?/i);
  fields.cashDate.value = mDate ? mDate[1] : fields.cashDate.value;
  fields.cashType.value = mType ? (mType[1].toLowerCase() === 'thu' ? 'Thu' : 'Chi') : fields.cashType.value;
  fields.cashAmount.value = mAmount ? parseNumberFromText(mAmount[1]) : fields.cashAmount.value;
  const mRoom = text.match(/phòng\s*([0-9]+)/i);
  fields.cashRoom.value = mRoom ? mRoom[1] : fields.cashRoom.value;
  const mNote = text.match(/ghi chú\s*[:\s]*(.*)/i);
  fields.cashNote.value = mNote ? mNote[1].trim() : fields.cashNote.value;
}

function importFromExcel(book) {
  if (book.Sheets['Danh sách phòng']) {
    const roomRows = parseExcelSheet(book.Sheets['Danh sách phòng']);
    const colMap = {
      room: ['Phòng', 'phòng', 'Room', 'room'],
      status: ['Trạng thái', 'trạng thái', 'Status', 'status'],
      rent: ['Tiền thuê', 'Tiền phòng', 'rent', 'Rent'],
      service: ['Tiền dịch vụ', 'service'],
      water: ['Tiền nước', 'water'],
      electricFee: ['Tiền điện', 'electric'],
      deposit: ['Tiền cọc', 'deposit'],
      paid: ['Đã nộp', 'paid'],
      people: ['Số người', 'people'],
      note: ['Ghi chú', 'note']
    };
    data.rooms = roomRows.reduce((acc, r) => {
      const m = mapColumns(r, colMap);
      if (!m.room) return acc;
      acc.push({
        id: nextId(data.rooms.concat(acc)),
        room: String(m.room || '').trim(),
        status: m.status || 'Đã chốt',
        rent: Number(m.rent || 0),
        service: Number(m.service || 0),
        water: Number(m.water || 0),
        electricFee: Number(m.electricFee || 0),
        deposit: Number(m.deposit || 0),
        paid: Number(m.paid || 0),
        people: Number(m.people || 1),
        note: m.note || ''
      });
      return acc;
    }, []);
  }

  if (book.Sheets['Chốt số điện']) {
    const elecRows = parseExcelSheet(book.Sheets['Chốt số điện']);
    const colMap = {
      month: ['Tháng', 'month'],
      room: ['Phòng', 'room'],
      prev: ['Số trước', 'prev'],
      curr: ['Số sau', 'curr'],
      unitPrice: ['Đơn giá', 'unitPrice', 'Đơn giá (vnđ)'],
      amount: ['Thành tiền', 'amount'],
      note: ['Ghi chú', 'note']
    };
    data.electric = elecRows.reduce((acc, r) => {
      const m = mapColumns(r, colMap);
      if (!m.room || !m.month) return acc;
      const prev = Number(m.prev || 0);
      const curr = Number(m.curr || 0);
      const unitPrice = Number(m.unitPrice || 4000);
      acc.push({
        id: nextId(data.electric.concat(acc)),
        month: String(parseExcelDate(m.month) || '').slice(0, 7),
        room: String(m.room || '').trim(),
        prev,
        curr,
        unitPrice,
        amount: Number(m.amount || (curr - prev) * unitPrice),
        note: m.note || ''
      });
      return acc;
    }, []);
  }

  if (book.Sheets['Thu chi']) {
    const cashRows = parseExcelSheet(book.Sheets['Thu chi']);
    const colMap = {
      date: ['Ngày', 'date'],
      type: ['Loại', 'type'],
      amount: ['Số tiền', 'amount'],
      note: ['Ghi chú', 'note'],
      room: ['Phòng', 'room']
    };
    data.cash = cashRows.reduce((acc, r) => {
      const m = mapColumns(r, colMap);
      if (!m.date || !m.type) return acc;
      acc.push({
        id: nextId(data.cash.concat(acc)),
        date: parseExcelDate(m.date),
        type: String(m.type).trim().startsWith('T') ? 'Thu' : 'Chi',
        amount: Number(m.amount || 0),
        note: m.note || '',
        room: m.room || ''
      });
      return acc;
    }, []);
  }

  save();
  alert('Import Excel thành công. Dữ liệu đã cập nhật.');
}

function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const roomsWs = XLSX.utils.json_to_sheet(data.rooms.map((r) => ({
    Phòng: r.room,
    'Trạng thái': r.status,
    'Tiền phòng': r.rent,
    'Tiền dịch vụ': r.service,
    'Tiền nước': r.water,
    'Tiền điện': r.electricFee,
    'Tiền cọc': r.deposit,
    'Đã nộp': r.paid,
    'Số người': r.people,
    'Ghi chú': r.note
  })));
  const electricWs = XLSX.utils.json_to_sheet(data.electric.map((e) => ({
    Tháng: e.month,
    Phòng: e.room,
    'Số trước': e.prev,
    'Số sau': e.curr,
    'Đơn giá': e.unitPrice,
    'Thành tiền': e.amount,
    'Ghi chú': e.note
  })));
  const cashWs = XLSX.utils.json_to_sheet(data.cash.map((c) => ({
    Ngày: c.date,
    Loại: c.type,
    'Số tiền': c.amount,
    'Ghi chú': c.note,
    Phòng: c.room
  })));

  XLSX.utils.book_append_sheet(wb, roomsWs, 'Danh sách phòng');
  XLSX.utils.book_append_sheet(wb, electricWs, 'Chốt số điện');
  XLSX.utils.book_append_sheet(wb, cashWs, 'Thu chi');

  XLSX.writeFile(wb, 'phongtro_data.xlsx');
}

function renderAll() {
  renderStats();
  renderRooms();
  renderElectric();
  renderCash();
  renderReport();
}

function showForm(form) {
  form.classList.remove('hidden');
}

function hideForm(form) {
  form.classList.add('hidden');
}


addRoomBtn.addEventListener('click', () => {
  roomForm.reset();
  current.roomId = null;
  roomFormTitle.textContent = 'Thêm phòng';
  fields.service.value = config.defaultService;
  fields.water.value = config.defaultWaterPrice;
  fields.electricFee.value = config.defaultUnitPrice;
  showForm(roomForm);
});

addElectricBtn.addEventListener('click', () => {
  electricForm.reset();
  current.electricId = null;
  electricFormTitle.textContent = 'Thêm chốt số';
  fields.month.value = new Date().toISOString().slice(0, 7);
  showForm(electricForm);
});

addCashBtn.addEventListener('click', () => {
  cashForm.reset();
  current.cashId = null;
  cashFormTitle.textContent = 'Thêm thu/chi';
  fields.cashDate.value = new Date().toISOString().slice(0, 10);
  showForm(cashForm);
});

scanElectricBtn?.addEventListener('click', () => {
  const file = electricImage?.files?.[0];
  if (!file) return alert('Chọn ảnh trước khi quét');
  ocrRecognizeFile(file, autoFillElectricFromText);
});

scanCashBtn?.addEventListener('click', () => {
  const file = cashImage?.files?.[0];
  if (!file) return alert('Chọn ảnh trước khi quét');
  ocrRecognizeFile(file, autoFillCashFromText);
});

saveConfigBtn.addEventListener('click', () => {
  config.defaultUnitPrice = Number(defaultUnitPriceInput.value) || config.defaultUnitPrice;
  config.defaultWaterPrice = Number(defaultWaterPriceInput.value) || config.defaultWaterPrice;
  config.defaultService = Number(defaultServiceInput.value) || config.defaultService;
  saveConfig();
  alert('Đã lưu cấu hình');
});

closeModalBtn?.addEventListener('click', () => modalOverlay?.classList.add('hidden'));
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
});
closeInvoice?.addEventListener('click', () => invoiceModal?.classList.add('hidden'));
invoiceModal?.addEventListener('click', (e) => {
  if (e.target === invoiceModal) invoiceModal.classList.add('hidden');
});

document.getElementById('cancelRoom').addEventListener('click', () => hideForm(roomForm));
document.getElementById('cancelElectric').addEventListener('click', () => hideForm(electricForm));
document.getElementById('cancelCash').addEventListener('click', () => hideForm(cashForm));

roomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = {
    id: current.roomId || Date.now(),
    room: fields.roomName.value.trim(),
    status: fields.status.value,
    rent: Number(fields.rent.value) || 0,
    service: Number(fields.service.value) || 0,
    water: Number(fields.water.value) || 0,
    electricFee: Number(fields.electricFee.value) || 0,
    deposit: Number(fields.deposit.value) || 0,
    paid: Number(fields.paid.value) || 0,
    people: Number(fields.people.value) || 1,
    note: fields.note.value.trim()
  };

  if (current.roomId) {
    data.rooms = data.rooms.map((r) => (r.id === current.roomId ? item : r));
  } else {
    data.rooms.push(item);
  }
  hideForm(roomForm);
  save();
});

electricForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = (Number(fields.curr.value) - Number(fields.prev.value)) * Number(fields.unitPrice.value);
  const item = {
    id: current.electricId || Date.now(),
    month: fields.month.value,
    room: fields.electricRoom.value.trim(),
    prev: Number(fields.prev.value) || 0,
    curr: Number(fields.curr.value) || 0,
    unitPrice: Number(fields.unitPrice.value) || 0,
    amount,
    note: fields.electricNote.value.trim()
  };

  if (current.electricId) {
    data.electric = data.electric.map((r) => (r.id === current.electricId ? item : r));
  } else {
    data.electric.push(item);
  }
  hideForm(electricForm);
  save();
});

cashForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = {
    id: current.cashId || Date.now(),
    date: fields.cashDate.value,
    type: fields.cashType.value,
    amount: Number(fields.cashAmount.value) || 0,
    note: fields.cashNote.value.trim(),
    room: fields.cashRoom.value.trim()
  };

  if (current.cashId) {
    data.cash = data.cash.map((r) => (r.id === current.cashId ? item : r));
  } else {
    data.cash.push(item);
  }
  hideForm(cashForm);
  save();
});

window.editRoom = function (id) {
  const r = data.rooms.find((x) => x.id === id);
  if (!r) return;
  current.roomId = id;
  roomFormTitle.textContent = 'Sửa phòng';
  fields.roomName.value = r.room;
  fields.status.value = r.status;
  fields.rent.value = r.rent;
  fields.service.value = r.service;
  fields.water.value = r.water;
  fields.electricFee.value = r.electricFee;
  fields.deposit.value = r.deposit;
  fields.paid.value = r.paid;
  fields.people.value = r.people;
  fields.note.value = r.note;
  showForm(roomForm);
};

window.deleteRoom = function (id) {
  if (!confirm('Xóa phòng?')) return;
  data.rooms = data.rooms.filter((x) => x.id !== id);
  save();
};

window.printInvoice = function (id) {
  const room = data.rooms.find((x) => x.id === id);
  if (!room) return;
  const electricRows = data.electric.filter((e) => e.room === room.room);
  const cashRows = data.cash.filter((c) => c.room === room.room);
  const now = new Date().toLocaleString();
  const totalThu = cashRows.filter((c) => c.type === 'Thu').reduce((s, c) => s + Number(c.amount || 0), 0);
  const totalChi = cashRows.filter((c) => c.type === 'Chi').reduce((s, c) => s + Number(c.amount || 0), 0);
  const due = Number(room.rent || 0) + Number(room.service || 0) + Number(room.water || 0) + Number(room.electricFee || 0) - Number(room.paid || 0);

  invoiceBody.innerHTML = `
    <div><strong>Hóa đơn phòng ${room.room} - ${now}</strong></div>
    <div class='invoice-total'>Tổng phải thu: ${formatMoney(Number(room.rent||0)+Number(room.service||0)+Number(room.water||0)+Number(room.electricFee||0))} ₫</div>
    <div class='invoice-total'>Đã thu: ${formatMoney(room.paid)} ₫</div>
    <div class='invoice-total'>Còn thiếu: ${formatMoney(due)} ₫</div>
    <table class='invoice-table'>
      <thead><tr><th>STT</th><th>Nội dung</th><th>Thành tiền</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Tiền phòng</td><td>${formatMoney(room.rent)} ₫</td></tr>
        <tr><td>2</td><td>Tiền dịch vụ</td><td>${formatMoney(room.service)} ₫</td></tr>
        <tr><td>3</td><td>Tiền nước</td><td>${formatMoney(room.water)} ₫</td></tr>
        <tr><td>4</td><td>Tiền điện</td><td>${formatMoney(room.electricFee)} ₫</td></tr>
        <tr><td>5</td><td>Đã nộp</td><td>${formatMoney(room.paid)} ₫</td></tr>
        <tr><td>6</td><td>Còn thiếu</td><td>${formatMoney(due)} ₫</td></tr>
      </tbody>
    </table>
    <div style='margin-top:8px; font-weight:700;'>Các chốt số điện</div>
    <table class='invoice-table'>
      <thead><tr><th>Tháng</th><th>Phòng</th><th>Tiêu thụ</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead>
      <tbody>${electricRows.map((e) => `<tr><td>${e.month}</td><td>${e.room}</td><td>${e.curr - e.prev}</td><td>${formatMoney(e.unitPrice)}</td><td>${formatMoney(e.amount)}</td></tr>`).join('')}</tbody>
    </table>
    <div style='margin-top:8px; font-weight:700;'>Thu/Chi</div>
    <table class='invoice-table'>
      <thead><tr><th>Ngày</th><th>Loại</th><th>Số tiền</th><th>Ghi chú</th></tr></thead>
      <tbody>${cashRows.map((c) => `<tr><td>${c.date}</td><td>${c.type}</td><td>${formatMoney(c.amount)}</td><td>${c.note || ''}</td></tr>`).join('')}</tbody>
    </table>
    <div class='invoice-total'>Tổng Thu: ${formatMoney(totalThu)} ₫ - Tổng Chi: ${formatMoney(totalChi)} ₫</div>
  `;
  invoiceModal.classList.remove('hidden');
};

window.editElectric = function (id) {
  const r = data.electric.find((x) => x.id === id);
  if (!r) return;
  current.electricId = id;
  electricFormTitle.textContent = 'Sửa chốt số';
  fields.month.value = r.month;
  fields.electricRoom.value = r.room;
  fields.prev.value = r.prev;
  fields.curr.value = r.curr;
  fields.unitPrice.value = r.unitPrice;
  fields.electricNote.value = r.note;
  showForm(electricForm);
};

window.deleteElectric = function (id) {
  if (!confirm('Xóa chốt số?')) return;
  data.electric = data.electric.filter((x) => x.id !== id);
  save();
};

window.editCash = function (id) {
  const r = data.cash.find((x) => x.id === id);
  if (!r) return;
  current.cashId = id;
  cashFormTitle.textContent = 'Sửa thu/chi';
  fields.cashDate.value = r.date;
  fields.cashType.value = r.type;
  fields.cashAmount.value = r.amount;
  fields.cashNote.value = r.note;
  fields.cashRoom.value = r.room;
  showForm(cashForm);
};

window.deleteCash = function (id) {
  if (!confirm('Xóa phiếu?')) return;
  data.cash = data.cash.filter((x) => x.id !== id);
  save();
};

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'phongtro_data.json';
  a.click();
});

exportExcelBtn.addEventListener('click', () => {
  exportToExcel();
});

resetBtn.addEventListener('click', () => {
  if (confirm('Xóa toàn bộ dữ liệu và khôi phục mẫu?')) {
    data = structuredClone(defaultData);
    save();
  }
});

importFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      if (json.rooms && json.electric && json.cash) {
        data = json;
        save();
        alert('Import JSON thành công');
      } else {
        alert('File JSON không hợp lệ (cần rooms, electric, cash).');
      }
    } catch (err) {
      alert('Lỗi JSON: ' + err.message);
    }
  };
  reader.readAsText(file, 'utf8');
});

importExcelFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const dataBuffer = ev.target.result;
      const workbook = XLSX.read(dataBuffer, { type: 'array' });
      importFromExcel(workbook);
    } catch (err) {
      alert('Lỗi khi đọc Excel: ' + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
});

showTab('rooms');
renderAll();
