const reports = [
  {
    report_id: 1,
    title: "Jalan Rusak",
    description: "Jalan berlubang di depan pasar.",
    photoUrl: "http://example.com/photos/1.jpg",
    verification_status: "pending",
    verification_notes: "",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-01T10:00:00Z",
    author_id: 101,
    verifier_id: null,
    comments: [
      { comment_id: 1, user_id: 201, report_id: 1, comment: "Segera diperbaiki dong!" },
      { comment_id: 2, user_id: 202, report_id: 1, comment: "Sering bikin macet." }
    ],
    likes: [
      { like_id: 1, user_id: 301, report_id: 1 },
      { like_id: 2, user_id: 302, report_id: 1 }
    ]
  },
  {
    report_id: 2,
    title: "Lampu Jalan Mati",
    description: "Lampu jalan mati di RT 02.",
    photoUrl: "http://example.com/photos/2.jpg",
    verification_status: "verified",
    verification_notes: "Sudah dicek.",
    createdAt: "2025-09-01T12:00:00Z",
    updatedAt: "2025-09-02T08:30:00Z",
    author_id: 102,
    verifier_id: 201,
    comments: [
      { comment_id: 3, user_id: 203, report_id: 2, comment: "Jadi gelap banget malam hari." }
    ],
    likes: [
      { like_id: 3, user_id: 304, report_id: 2 }
    ]
  },
  {
    report_id: 3,
    title: "Sampah Menumpuk",
    description: "Tumpukan sampah di pinggir jalan.",
    photoUrl: "http://example.com/photos/3.jpg",
    verification_status: "rejected",
    verification_notes: "Duplikat laporan.",
    createdAt: "2025-09-02T07:00:00Z",
    updatedAt: "2025-09-02T09:15:00Z",
    author_id: 103,
    verifier_id: 202,
    comments: [
      { comment_id: 4, user_id: 204, report_id: 3, comment: "Bau sekali di area sini." }
    ],
    likes: []
  },
  {
    report_id: 4,
    title: "Pohon Tumbang",
    description: "Pohon tumbang menutupi jalan.",
    photoUrl: "http://example.com/photos/4.jpg",
    verification_status: "pending",
    verification_notes: "",
    createdAt: "2025-09-03T14:00:00Z",
    updatedAt: "2025-09-03T14:00:00Z",
    author_id: 104,
    verifier_id: null,
    comments: [
      { comment_id: 5, user_id: 205, report_id: 4, comment: "Harus dipotong segera." },
      { comment_id: 6, user_id: 206, report_id: 4, comment: "Bahaya kalau dibiarkan." }
    ],
    likes: [
      { like_id: 4, user_id: 305, report_id: 4 }
    ]
  },
  {
    report_id: 5,
    title: "Kebocoran Pipa",
    description: "Pipa air bocor dekat perempatan.",
    photoUrl: "http://example.com/photos/5.jpg",
    verification_status: "verified",
    verification_notes: "Sudah ditindak.",
    createdAt: "2025-09-04T09:30:00Z",
    updatedAt: "2025-09-04T11:45:00Z",
    author_id: 105,
    verifier_id: 203,
    comments: [],
    likes: []
  },
  {
    report_id: 6,
    title: "Kecelakaan Lalu Lintas",
    description: "Motor tabrakan dengan mobil.",
    photoUrl: "http://example.com/photos/6.jpg",
    verification_status: "verified",
    verification_notes: "Diteruskan ke kepolisian.",
    createdAt: "2025-09-05T08:20:00Z",
    updatedAt: "2025-09-05T08:45:00Z",
    author_id: 106,
    verifier_id: 204,
    comments: [
      { comment_id: 7, user_id: 207, report_id: 6, comment: "Semoga korban selamat." }
    ],
    likes: [
      { like_id: 5, user_id: 306, report_id: 6 },
      { like_id: 6, user_id: 307, report_id: 6 }
    ]
  },
  {
    report_id: 7,
    title: "Kebakaran",
    description: "Kebakaran kecil di rumah warga.",
    photoUrl: "http://example.com/photos/7.jpg",
    verification_status: "pending",
    verification_notes: "",
    createdAt: "2025-09-06T16:00:00Z",
    updatedAt: "2025-09-06T16:00:00Z",
    author_id: 107,
    verifier_id: null,
    comments: [],
    likes: []
  },
  {
    report_id: 8,
    title: "Kabel Listrik Putus",
    description: "Kabel listrik jatuh di jalan.",
    photoUrl: "http://example.com/photos/8.jpg",
    verification_status: "verified",
    verification_notes: "PLN sudah diberitahu.",
    createdAt: "2025-09-06T20:30:00Z",
    updatedAt: "2025-09-07T06:00:00Z",
    author_id: 108,
    verifier_id: 205,
    comments: [
      { comment_id: 8, user_id: 208, report_id: 8, comment: "Bahaya banget ini." }
    ],
    likes: [
      { like_id: 7, user_id: 308, report_id: 8 }
    ]
  },
  {
    report_id: 9,
    title: "Banjir",
    description: "Banjir setinggi 30cm di gang Melati.",
    photoUrl: "http://example.com/photos/9.jpg",
    verification_status: "rejected",
    verification_notes: "Data tidak lengkap.",
    createdAt: "2025-09-07T02:00:00Z",
    updatedAt: "2025-09-07T03:10:00Z",
    author_id: 109,
    verifier_id: 206,
    comments: [
      { comment_id: 9, user_id: 209, report_id: 9, comment: "Harus ada bantuan darurat." }
    ],
    likes: []
  },
  {
    report_id: 10,
    title: "Atap Ambruk",
    description: "Atap rumah warga roboh karena hujan deras.",
    photoUrl: "http://example.com/photos/10.jpg",
    verification_status: "pending",
    verification_notes: "",
    createdAt: "2025-09-07T12:00:00Z",
    updatedAt: "2025-09-07T12:00:00Z",
    author_id: 110,
    verifier_id: null,
    comments: [
      { comment_id: 10, user_id: 210, report_id: 10, comment: "Semoga ada bantuan cepat." }
    ],
    likes: [
      { like_id: 8, user_id: 309, report_id: 10 },
      { like_id: 9, user_id: 310, report_id: 10 }
    ]
  }
];


export default reports;
