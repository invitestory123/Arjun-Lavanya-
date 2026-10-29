export const wedding = {
  groom: {
    name: "Arjun",
    fullName: "Arjun",
    line: "The Groom",
    note: "Stepping into this new chapter with boundless joy, gratitude, and a promise of forever.",
    image: "/images/groom-entry.jpg",
  },
  bride: {
    name: "Lavanya",
    fullName: "Lavanya",
    line: "The Bride",
    note: "Walking hand in hand toward a future filled with laughter, cherished dreams, and unconditional love.",
    image: "/images/bride-entry.jpg",
  },
  coverImage: "/images/cover-photo.jpg",
  endImage: "/images/end-photo.jpg",
  audioSrc: "/audio/song.mp3",

  // Primary wedding date (13 November 2026) for hero & countdown
  dateISO: "2026-11-13T10:00:00+05:30",
  endISO: "2026-11-13T14:00:00+05:30",
  dateLabel: "Friday, 13 November 2026",
  timeLabel: "Morning onwards",
  muhurthamLabel: "Sumuhurtham",
  venue: {
    name: "Shri Laxmi Ranganatha Kalyana Mantapa",
    address: "Devadurga Tq, Raichur Dist, Karnataka",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Shri+Laxmi+Ranganatha+kalyana+mantapa+devadurga+Raichur",
  },

  events: [
    {
      id: "marriage",
      title: "Marriage Ceremony",
      subtitle: "The Auspicious Muhurtham & Sacred Vows",
      day: "13",
      monthYear: "November 2026",
      dateLabel: "Friday, 13 November 2026",
      timeLabel: "Morning onwards",
      muhurthamLabel: "Sumuhurtham",
      dateISO: "2026-11-13T10:00:00+05:30",
      endISO: "2026-11-13T14:00:00+05:30",
      venue: {
        name: "Shri Laxmi Ranganatha Kalyana Mantapa",
        address: "Devadurga Tq, Raichur Dist, Karnataka",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Shri+Laxmi+Ranganatha+kalyana+mantapa+devadurga+Raichur",
      },
    },
    {
      id: "reception",
      title: "Wedding Reception",
      subtitle: "Dinner, Music & Celebrations",
      day: "16",
      monthYear: "November 2026",
      dateLabel: "Monday, 16 November 2026",
      timeLabel: "6:30 PM onwards",
      muhurthamLabel: "Reception & Dinner",
      dateISO: "2026-11-16T18:30:00+05:30",
      endISO: "2026-11-16T22:30:00+05:30",
      venue: {
        name: "Ambedkar Kalyana Mantapa",
        address: "Raichur Dist, Karnataka",
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Ambedkar+kalyana+mantapa+Raichur",
      },
    },
  ],
};
