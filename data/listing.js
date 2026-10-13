export const listing = {
  price: 8900000,
  priceOld: 9500000,
  market: { low: 9000000, high: 11000000 },
  slider: { min: 7800000, max: 11000000, step: 100000 },
  pcOnly: {
    price: 7000000,
    includes: [
      "Casing + PSU",
      "Intel Core i5-12400F",
      "MSI H610",
      "RAM 24 GB DDR4",
      "RTX 3060 12 GB",
      "SSD 256 GB + HDD 500 GB",
      "Windows 11 Pro"
    ],
    excludes: ["Monitor", "Keyboard", "Mouse"]
  },
  waNumber: "6282190003587",
  deal: {
    cod: "COD ambil di rumah — Jakarta Timur, Halim",
    codNote: "Hanya bisa ambil langsung di rumah, daerah Jaktim (Halim). Belum bisa diantar atau ketemuan di tempat lain.",
    payment: ["BCA", "Mandiri", "BRI"],
    paymentNote: "Pembayaran hanya terima transfer bank: BCA, Mandiri, atau BRI. Transfer dulu, baru unit diserahkan saat COD."
  },
  source: "DxDiag 13 Oktober 2026",
  gallery: [
    { src: "/pc-fullset.png", alt: "Fullset PC, monitor, keyboard, dan mouse", caption: "Fullset" },
    { src: "/gpu-closeup.png", alt: "Close-up VGA NVIDIA RTX 3060", caption: "RTX 3060 12GB" },
    { src: "/monitor-desk.png", alt: "Monitor Xiaomi 24 inci di meja", caption: "Monitor Xiaomi 24\" 119Hz" },
    { src: "/internals.png", alt: "Isi dalam casing: motherboard, RAM, SSD", caption: "Isi dalam" }
  ],
  tabs: [
    {
      id: "komponen",
      label: "Komponen",
      rows: [
        ["Processor", "Intel Core i5-12400F (12 CPUs, ~2.5 GHz)"],
        ["Motherboard", "MSI MS-7D48, chipset H610, BIOS UEFI A.A0"],
        ["RAM", "24 GB DDR4"],
        ["VGA", "NVIDIA GeForce RTX 3060 12 GB dedicated"],
        ["DirectX", "DirectX 12, WDDM 3.2, driver 32.0.15.9186"]
      ]
    },
    {
      id: "penyimpanan",
      label: "Penyimpanan & OS",
      rows: [
        ["SSD", "RX7 M.2 NVMe 256 GB (C:), sisa 15,5 GB"],
        ["HDD", "Seagate ST3500312CS 500 GB (D:), sisa 256,1 GB"],
        ["OS", "Windows 11 Pro 64-bit, build 26200"],
        ["Jaringan", "Realtek PCIe GbE Family Controller"],
        ["Audio", "NVIDIA High Definition Audio"]
      ]
    },
    {
      id: "kelengkapan",
      label: "Kelengkapan",
      rows: [
        ["Unit PC", "Casing, mobo, CPU, RAM, VGA, SSD, HDD, PSU"],
        ["Monitor", "Xiaomi Mi Monitor XMI24B1, 1920x1080, 119 Hz, HDMI"],
        ["Keyboard", "USB Gaming Keyboard"],
        ["Mouse", "USB Gaming Mouse"],
        ["Sistem", "Windows 11 Pro aktif, driver terbaru"]
      ]
    }
  ],
  notes: [
    "Jujur ya, bos: laporan DxDiag bersih — Display, Sound, dan Input nol error.",
    "Driver VGA versi terbaru (32.0.15.9186, 20 Januari 2026), tinggal pakai.",
    "SSD C: sisa 15,5 GB — tenang, sebelum serah terima diformat + install ulang Windows, bersih seratus.",
    "Box asli cuma ada untuk unit PC dan monitor. Keyboard dan mouse polosan tanpa box.",
    "Transaksi COD ambil di rumah aja, daerah Jaktim (Halim). Bayarnya transfer bank: BCA, Mandiri, atau BRI.",
    "Barang bekas pemakaian pribadi, rawatan sendiri — semua fungsi normal.",
    "Satu unit aja, bos — siapa cepat dapat. Serius ambil, langsung chat biar enggak kehabisan."
  ],
  parts: [
    ["RTX 3060 12 GB", 3500000, 4500000],
    ["i5-12400F + MSI H610", 2700000, 3500000],
    ["RAM 24 GB", 600000, 800000],
    ["SSD 256 GB + HDD 500 GB", 500000, 500000],
    ["Monitor Xiaomi 24\"", 1200000, 1800000],
    ["Casing + PSU (estimasi)", 500000, 700000]
  ],
  faq: [
    {
      q: "Bisa test dulu sebelum beli?",
      a: "Bisa banget, bos. Bawa monitor sendiri atau test langsung di rumah. Semua port, fan, dan boot masuk Windows dicek bareng-bareng sampai puas."
    },
    {
      q: "Kenapa SSD C: sisa 15,5 GB?",
      a: "Wajar kok, bos — sistem dan aplikasi masih terpasang. Sebelum diserahkan, SSD diformat dan Windows dipasang ulang supaya bersih seratus persen."
    },
    {
      q: "Kenapa RAM 24 GB, bukan 16 atau 32?",
      a: "Kombinasi modul yang terpasang kebaca DxDiag sebagai 24576 MB. Angka asli, jalan normal tanpa error — bukan salah baca, bos."
    },
    {
      q: "Harga masih bisa nego?",
      a: "Untuk fullset, bisa — geser aja slider di halaman ini, tawaran langsung terkirim ke WhatsApp. PC Only enggak bisa nego lagi, bos, sudah harga mentok Rp7.000.000."
    },
    {
      q: "Ada opsi beli tanpa monitor, keyboard, dan mouse?",
      a: "Ada, bos. Paket PC Only Rp7.000.000: unit PC lengkap beserta komponen internalnya. Cocok banget kalau sudah punya perlengkapan sendiri."
    },
    {
      q: "Bisa COD atau dikirim?",
      a: "Bisa COD, tapi ambil langsung di rumah aja — daerah Jakarta Timur, Halim. Belum bisa diantar atau ketemuan di luar daerah itu, maklum unitnya gede, bos."
    },
    {
      q: "Bayar pakai apa?",
      a: "Transfer bank aja, bos: BCA, Mandiri, atau BRI. Transfer dulu, baru unit diserahkan pas COD — adil dan aman buat dua pihak."
    },
    {
      q: "Dapat kotak / box asli enggak?",
      a: "Box asli cuma ada untuk unit PC dan monitor. Keyboard dan mouse polosan tanpa box — tapi tenang, semua dibungkus aman pas serah terima."
    },
    {
      q: "Dapat apa saja kalau beli fullset?",
      a: "Unit PC, monitor Xiaomi 24 inci, keyboard gaming, dan mouse gaming. Windows 11 Pro sudah terpasang. Box PC dan monitor masih ada; keyboard dan mouse tanpa box."
    }
  ]
};

export const rupiah = (n) => "Rp " + new Intl.NumberFormat("id-ID").format(n);
