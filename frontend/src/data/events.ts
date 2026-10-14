import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.jpg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    capacity: 50,
    description: "Sektörden bir uzmanla yazılım güvenliği ve kariyer üzerine sohbet."
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    capacity: 30,
    description: "HTML, CSS ve React ile ilk kişisel sayfanı yap."
  },
  {
    id: "event-5",
    title: "Hackathon: Kampüs Çözümleri",
    category: "Yarışma",
    date: "15-11-2026",
    time: "09:00",
    location: "İnovasyon Merkezi",
    capacity: 40,
    description: "Kampüs hayatını kolaylaştıracak yazılım algoritmaları üretme yarışması."
  },
  {
    id: "event-6",
    title: "Endüstri 4.0 ve Veri Analizi",
    category: "Seminer",
    date: "24-11-2026",
    time: "14:30",
    location: "Mühendislik Fakültesi Konferans Salonu",
    capacity: 120,
    description: "Üretimde dijital dönüşüm, karar verme modelleri ve veri bilimi uygulamaları."
  }
];