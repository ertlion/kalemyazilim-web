import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@kalemyazilim.com" },
    update: {},
    create: {
      email: "admin@kalemyazilim.com",
      passwordHash,
      name: "Admin",
    },
  });

  // Products - Real KL-Retail products
  const products = [
    {
      slug: "kl-retail-t-pos",
      icon: "Monitor",
      category: "pos",
      coverImage: "/uploads/perakende-banner.jpg",
      sortOrder: 1,
      tr: {
        title: "KL-Retail T-POS",
        shortDescription: "Perakende satış noktaları için hızlı, güvenilir ve kullanımı kolay POS yazılımı.",
        description: "<h2>KL-Retail T-POS</h2><p>Perakende satış noktalarınız için geliştirilmiş, hızlı ve güvenilir POS yazılımı. Barkod okuyucu, yazar kasa ve ödeme terminali entegrasyonu ile eksiksiz bir satış deneyimi sunar.</p><h3>Öne Çıkan Özellikler</h3><ul><li>Hızlı satış ekranı</li><li>Barkod ve QR kod desteği</li><li>Çoklu ödeme yöntemi</li><li>Stok takibi</li><li>Müşteri sadakat programı</li><li>Raporlama ve analiz</li><li>E-Fatura / E-Arşiv entegrasyonu</li><li>Çoklu şube desteği</li></ul>",
        features: '["Hızlı satış ekranı","Barkod ve QR kod desteği","Çoklu ödeme yöntemi","Stok takibi","Müşteri sadakat programı","Raporlama ve analiz","E-Fatura entegrasyonu","Çoklu şube desteği"]',
      },
      en: {
        title: "KL-Retail T-POS",
        shortDescription: "Fast, reliable and easy-to-use POS software for retail points of sale.",
        description: "<h2>KL-Retail T-POS</h2><p>Fast and reliable POS software developed for your retail points of sale. Provides a complete sales experience with barcode scanner, cash register, and payment terminal integration.</p>",
        features: '["Fast sales screen","Barcode and QR code support","Multiple payment methods","Stock tracking","Customer loyalty program","Reporting and analytics","E-Invoice integration","Multi-branch support"]',
      },
    },
    {
      slug: "kl-retail-market-modulu",
      icon: "ShoppingCart",
      category: "pos",
      coverImage: "/uploads/market-banner.jpg",
      sortOrder: 2,
      tr: {
        title: "KL-Retail Market Modülü",
        shortDescription: "Süpermarket ve gıda perakendecileri için özel çözüm.",
        description: "<h2>KL-Retail Market Modülü</h2><p>Süpermarket ve gıda perakendecileri için özel olarak tasarlanmış modül. Tartılı ürün yönetimi, raf etiketleme, kampanya ve promosyon yönetimi gibi market özelinde ihtiyaçları karşılar.</p>",
        features: '["Tartılı ürün yönetimi","Raf etiketleme","Kampanya yönetimi","Terazi entegrasyonu","Promosyon yönetimi","Departman bazlı raporlama"]',
      },
      en: {
        title: "KL-Retail Market Module",
        shortDescription: "Specialized solution for supermarkets and food retailers.",
        description: "<h2>KL-Retail Market Module</h2><p>Module specifically designed for supermarkets and food retailers. Meets market-specific needs such as weighed product management, shelf labeling, campaign and promotion management.</p>",
        features: '["Weighed product management","Shelf labeling","Campaign management","Scale integration","Promotion management","Department-based reporting"]',
      },
    },
    {
      slug: "kl-retail-food-pos",
      icon: "UtensilsCrossed",
      category: "pos",
      coverImage: "/uploads/food-banner.jpg",
      sortOrder: 3,
      tr: {
        title: "KL-Retail Food POS",
        shortDescription: "Cafe, restoran ve yeme-içme sektörü için özel POS çözümü.",
        description: "<h2>KL-Retail Food POS</h2><p>Cafe, restoran ve yeme-içme sektörü için özel olarak tasarlanmış POS çözümü. Masa yönetimi, adisyon takibi, mutfak yazıcısı ve self-servis kiosk desteği sunar.</p>",
        features: '["Masa yönetimi","Adisyon takibi","Mutfak yazıcısı","Self-servis kiosk","Paket servis modülü","Garson bazlı raporlama"]',
      },
      en: {
        title: "KL-Retail Food POS",
        shortDescription: "Specialized POS solution for cafes, restaurants and food service.",
        description: "<h2>KL-Retail Food POS</h2><p>POS solution specifically designed for cafes, restaurants and the food service industry. Offers table management, check tracking, kitchen printer and self-service kiosk support.</p>",
        features: '["Table management","Check tracking","Kitchen printer","Self-service kiosk","Delivery module","Waiter-based reporting"]',
      },
    },
    {
      slug: "kl-retail-akaryakit-modulu",
      icon: "Fuel",
      category: "sector",
      coverImage: "/uploads/akaryakit-banner.jpg",
      sortOrder: 4,
      tr: {
        title: "KL-Retail Akaryakıt Modülü",
        shortDescription: "Akaryakıt istasyonları için entegre otomasyon çözümü.",
        description: "<h2>KL-Retail Akaryakıt Modülü</h2><p>Akaryakıt istasyonlarına özel geliştirilmiş otomasyon çözümü. Pompa entegrasyonu, tank ölçüm sistemi, filolara yakıt ikmal ve EPDK raporlaması gibi sektörel gereksinimleri eksiksiz karşılar.</p>",
        features: '["Pompa entegrasyonu","Tank ölçüm sistemi","Filo yakıt yönetimi","EPDK raporlaması","Plaka tanıma sistemi","Otomat yönetimi"]',
      },
      en: {
        title: "KL-Retail Fuel Station Module",
        shortDescription: "Integrated automation solution for fuel stations.",
        description: "<h2>KL-Retail Fuel Station Module</h2><p>Automation solution specifically developed for fuel stations. Fully meets sector requirements such as pump integration, tank measurement system, fleet fueling and EPDK reporting.</p>",
        features: '["Pump integration","Tank measurement system","Fleet fuel management","EPDK reporting","License plate recognition","Vending management"]',
      },
    },
    {
      slug: "kl-retail-m-pos",
      icon: "Smartphone",
      category: "mobile",
      sortOrder: 5,
      tr: {
        title: "KL-Retail M-POS Satış Konsolu",
        shortDescription: "Mobil satış için tablet ve telefon üzerinde çalışan POS çözümü.",
        description: "<h2>KL-Retail M-POS</h2><p>Tablet ve akıllı telefon üzerinde çalışan mobil POS çözümü. Mağaza içi gezici satış, fuar ve açık alan satışları için idealdir.</p>",
        features: '["Mobil satış","Tablet uyumlu","Bluetooth yazıcı desteği","Offline çalışma","Anlık stok sorgulama","Müşteri bilgi görüntüleme"]',
      },
      en: {
        title: "KL-Retail M-POS Sales Console",
        shortDescription: "POS solution running on tablets and phones for mobile sales.",
        description: "<h2>KL-Retail M-POS</h2><p>Mobile POS solution running on tablets and smartphones. Ideal for in-store mobile sales, trade shows and outdoor sales.</p>",
        features: '["Mobile sales","Tablet compatible","Bluetooth printer support","Offline mode","Real-time stock query","Customer info display"]',
      },
    },
    {
      slug: "kl-retail-el-terminali",
      icon: "ScanLine",
      category: "mobile",
      coverImage: "/uploads/el-terminali-banner.jpg",
      sortOrder: 6,
      tr: {
        title: "KL-Retail El Terminali Modülü",
        shortDescription: "Depo ve mağaza operasyonları için el terminali çözümü.",
        description: "<h2>KL-Retail El Terminali Modülü</h2><p>Depo sayım, mal kabul, etiketleme ve raf yönetimi işlemlerini el terminali üzerinden gerçekleştirin. Anlık stok sorgulama ve sayım tutarsızlığı raporları ile operasyonel verimliliği artırın.</p>",
        features: '["Depo sayımı","Mal kabul","Etiket basımı","Raf yönetimi","Anlık stok sorgulama","Sayım tutarsızlık raporu"]',
      },
      en: {
        title: "KL-Retail Handheld Terminal Module",
        shortDescription: "Handheld terminal solution for warehouse and store operations.",
        description: "<h2>KL-Retail Handheld Terminal Module</h2><p>Perform warehouse counting, goods receiving, labeling and shelf management operations via handheld terminal.</p>",
        features: '["Warehouse counting","Goods receiving","Label printing","Shelf management","Real-time stock query","Count discrepancy report"]',
      },
    },
    {
      slug: "kl-retail-mobile-report",
      icon: "BarChart3",
      category: "mobile",
      sortOrder: 7,
      tr: {
        title: "KL-Retail Mobile Report",
        shortDescription: "İşletme raporlarınıza mobil cihazınızdan erişin.",
        description: "<h2>KL-Retail Mobile Report</h2><p>Satış, stok ve finansal raporlarınıza mobil cihazınızdan her an her yerden erişin. Yönetici dashboard'u ile anlık karar desteği sağlayın.</p>",
        features: '["Mobil raporlama","Yönetici dashboard","Anlık satış verileri","Stok durumu","Karşılaştırmalı analizler","Push bildirimler"]',
      },
      en: {
        title: "KL-Retail Mobile Report",
        shortDescription: "Access your business reports from your mobile device.",
        description: "<h2>KL-Retail Mobile Report</h2><p>Access your sales, inventory and financial reports from your mobile device anytime, anywhere.</p>",
        features: '["Mobile reporting","Executive dashboard","Real-time sales data","Stock status","Comparative analysis","Push notifications"]',
      },
    },
    {
      slug: "kl-retail-eft-pos",
      icon: "CreditCard",
      category: "pos",
      sortOrder: 8,
      tr: {
        title: "KL-Retail EFT POS",
        shortDescription: "Entegre ödeme terminali çözümü.",
        description: "<h2>KL-Retail EFT POS</h2><p>Ingenico ve diğer ödeme terminalleri ile entegre çalışan ödeme çözümü. Taksitli satış, puan sorgulama ve otomatik kapanış işlemleri.</p>",
        features: '["Ingenico entegrasyonu","Taksitli satış","Puan sorgulama","Otomatik gün sonu","Temassız ödeme","Çoklu banka desteği"]',
      },
      en: {
        title: "KL-Retail EFT POS",
        shortDescription: "Integrated payment terminal solution.",
        description: "<h2>KL-Retail EFT POS</h2><p>Payment solution integrated with Ingenico and other payment terminals. Installment sales, loyalty points query and automatic end-of-day closing.</p>",
        features: '["Ingenico integration","Installment sales","Points query","Auto end-of-day","Contactless payment","Multi-bank support"]',
      },
    },
    {
      slug: "kl-retail-crm",
      icon: "Heart",
      category: "crm",
      sortOrder: 9,
      tr: {
        title: "KL-Retail CRM",
        shortDescription: "Müşteri ilişkileri yönetimi ve sadakat programı.",
        description: "<h2>KL-Retail CRM</h2><p>Müşteri davranışlarını analiz edin, kişiselleştirilmiş kampanyalar oluşturun ve müşteri sadakatini artırın. SMS ve e-posta ile otomatik bildirim gönderin.</p>",
        features: '["Müşteri segmentasyonu","Puan ve sadakat sistemi","Kampanya yönetimi","SMS/E-posta bildirimleri","Davranış analizi","RFM analizi"]',
      },
      en: {
        title: "KL-Retail CRM",
        shortDescription: "Customer relationship management and loyalty program.",
        description: "<h2>KL-Retail CRM</h2><p>Analyze customer behavior, create personalized campaigns, and increase customer loyalty.</p>",
        features: '["Customer segmentation","Points and loyalty system","Campaign management","SMS/Email notifications","Behavior analysis","RFM analysis"]',
      },
    },
    {
      slug: "kl-retail-kantin-modulu",
      icon: "Coffee",
      category: "pos",
      coverImage: "/uploads/kantin-banner.jpg",
      sortOrder: 10,
      tr: {
        title: "KL-Retail Kantin Modülü",
        shortDescription: "Okul, fabrika ve kurum kantinleri için özel çözüm.",
        description: "<h2>KL-Retail Kantin Modülü</h2><p>Okul, fabrika ve kurum kantinleri için özel olarak geliştirilmiş çözüm. Personel kartı, bakiye yönetimi ve yemekhane entegrasyonu.</p>",
        features: '["Personel kart sistemi","Bakiye yönetimi","Yemekhane entegrasyonu","Veli bilgilendirme","Günlük limit belirleme","Raporlama"]',
      },
      en: {
        title: "KL-Retail Canteen Module",
        shortDescription: "Specialized solution for school, factory and institutional canteens.",
        description: "<h2>KL-Retail Canteen Module</h2><p>Solution specifically developed for school, factory and institutional canteens.</p>",
        features: '["Staff card system","Balance management","Cafeteria integration","Parent notification","Daily limit setting","Reporting"]',
      },
    },
    {
      slug: "kl-retail-avm-yonetimi",
      icon: "Building2",
      category: "management",
      sortOrder: 11,
      tr: {
        title: "KL-Retail AVM Yönetimi",
        shortDescription: "Alışveriş merkezi yönetim ve kiracı takip sistemi.",
        description: "<h2>KL-Retail AVM Yönetimi</h2><p>Alışveriş merkezleri için kiracı ciro takibi, ortak alan yönetimi ve raporlama çözümü.</p>",
        features: '["Kiracı ciro takibi","Ortak alan yönetimi","Ziyaretçi sayımı","Kira yönetimi","Performans raporları","Kampanya koordinasyonu"]',
      },
      en: {
        title: "KL-Retail Mall Management",
        shortDescription: "Shopping mall management and tenant tracking system.",
        description: "<h2>KL-Retail Mall Management</h2><p>Tenant revenue tracking, common area management and reporting solution for shopping malls.</p>",
        features: '["Tenant revenue tracking","Common area management","Visitor counting","Rent management","Performance reports","Campaign coordination"]',
      },
    },
    {
      slug: "kl-retail-franchising-manager",
      icon: "Network",
      category: "management",
      sortOrder: 12,
      tr: {
        title: "KL-Retail Franchising Manager",
        shortDescription: "Franchise zinciri yönetim ve kontrol çözümü.",
        description: "<h2>KL-Retail Franchising Manager</h2><p>Franchise zincirleri için merkezi yönetim, şube kontrol ve performans izleme çözümü.</p>",
        features: '["Merkezi yönetim","Şube kontrol","Performans izleme","Standart uyum kontrolü","Merkezi fiyat yönetimi","Franchise raporlaması"]',
      },
      en: {
        title: "KL-Retail Franchising Manager",
        shortDescription: "Franchise chain management and control solution.",
        description: "<h2>KL-Retail Franchising Manager</h2><p>Central management, branch control and performance monitoring solution for franchise chains.</p>",
        features: '["Central management","Branch control","Performance monitoring","Standard compliance check","Central pricing","Franchise reporting"]',
      },
    },
    {
      slug: "kl-retail-duty-free-pos",
      icon: "Plane",
      category: "pos",
      coverImage: "/uploads/duty-free-banner.jpg",
      sortOrder: 13,
      tr: {
        title: "KL-Retail Duty Free POS",
        shortDescription: "Duty free ve havalimanı mağazaları için özel POS çözümü.",
        description: "<h2>KL-Retail Duty Free POS</h2><p>Duty free mağazalar ve havalimanı perakendecileri için özel çözüm. Pasaport okuma, döviz çevirme ve uçuş bilgisi entegrasyonu.</p>",
        features: '["Pasaport okuma","Çoklu döviz desteği","Uçuş bilgisi entegrasyonu","Tax-free işlemleri","VIP müşteri yönetimi","Özel raporlama"]',
      },
      en: {
        title: "KL-Retail Duty Free POS",
        shortDescription: "Specialized POS solution for duty free and airport stores.",
        description: "<h2>KL-Retail Duty Free POS</h2><p>Special solution for duty free stores and airport retailers. Passport reading, currency conversion and flight info integration.</p>",
        features: '["Passport reading","Multi-currency support","Flight info integration","Tax-free processing","VIP customer management","Custom reporting"]',
      },
    },
    {
      slug: "kl-retail-satinalma",
      icon: "ClipboardList",
      category: "erp",
      sortOrder: 14,
      tr: {
        title: "KL-Retail Satınalma",
        shortDescription: "Tedarik zinciri ve satınalma süreçleri yönetimi.",
        description: "<h2>KL-Retail Satınalma</h2><p>Tedarikçi yönetimi, sipariş takibi, fiyat karşılaştırma ve otomatik sipariş oluşturma ile satınalma süreçlerinizi optimize edin.</p>",
        features: '["Tedarikçi yönetimi","Sipariş takibi","Fiyat karşılaştırma","Otomatik sipariş","Mal kabul","Satınalma raporları"]',
      },
      en: {
        title: "KL-Retail Purchasing",
        shortDescription: "Supply chain and purchasing process management.",
        description: "<h2>KL-Retail Purchasing</h2><p>Optimize your purchasing processes with supplier management, order tracking, price comparison and automatic order creation.</p>",
        features: '["Supplier management","Order tracking","Price comparison","Automatic ordering","Goods receiving","Purchasing reports"]',
      },
    },
    {
      slug: "enpos-yazarkasa",
      icon: "Printer",
      category: "hardware",
      coverImage: "/uploads/enpos-banner.jpg",
      sortOrder: 15,
      tr: {
        title: "Enpos Yazarkasa",
        shortDescription: "Yeni nesil ÖKC uyumlu akıllı yazarkasa çözümü.",
        description: "<h2>Enpos Yazarkasa</h2><p>GİB onaylı yeni nesil ÖKC (Ödeme Kaydedici Cihaz) uyumlu akıllı yazarkasa. KL-Retail POS ile tam entegre çalışır.</p>",
        features: '["GİB onaylı","Yeni nesil ÖKC","KL-Retail entegrasyonu","E-Fatura desteği","Dokunmatik ekran","Kompakt tasarım"]',
      },
      en: {
        title: "Enpos Cash Register",
        shortDescription: "New generation smart cash register solution.",
        description: "<h2>Enpos Cash Register</h2><p>GIB approved new generation smart cash register. Fully integrated with KL-Retail POS.</p>",
        features: '["GIB approved","New generation","KL-Retail integration","E-Invoice support","Touchscreen","Compact design"]',
      },
    },
    {
      slug: "kl-retail-yazarkasa-entegrasyonu",
      icon: "Link",
      category: "integration",
      sortOrder: 16,
      tr: {
        title: "KL-Retail Yazarkasa Entegrasyonu",
        shortDescription: "Tüm yazarkasa markaları ile sorunsuz entegrasyon.",
        description: "<h2>KL-Retail Yazarkasa Entegrasyonu</h2><p>Tüm büyük yazarkasa markaları ile entegre çalışan çözümümüz, mevcut donanımınızı değiştirmeden KL-Retail'e geçiş yapmanızı sağlar.</p>",
        features: '["Çoklu marka desteği","Kolay kurulum","E-Fatura/E-Arşiv","Otomatik Z raporu","GİB entegrasyonu","7/24 destek"]',
      },
      en: {
        title: "KL-Retail Cash Register Integration",
        shortDescription: "Seamless integration with all cash register brands.",
        description: "<h2>KL-Retail Cash Register Integration</h2><p>Our solution works integrated with all major cash register brands, allowing you to switch to KL-Retail without replacing your existing hardware.</p>",
        features: '["Multi-brand support","Easy setup","E-Invoice/E-Archive","Auto Z report","GIB integration","24/7 support"]',
      },
    },
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: { icon: p.icon, category: p.category, sortOrder: p.sortOrder, coverImage: p.coverImage || null },
      create: {
        slug: p.slug,
        icon: p.icon,
        category: p.category,
        coverImage: p.coverImage || null,
        sortOrder: p.sortOrder,
      },
    });

    for (const locale of ["tr", "en"] as const) {
      const t = p[locale];
      await prisma.productTranslation.upsert({
        where: { productId_locale: { productId: product.id, locale } },
        update: { title: t.title, shortDescription: t.shortDescription, description: t.description, features: t.features },
        create: {
          productId: product.id,
          locale,
          title: t.title,
          shortDescription: t.shortDescription,
          description: t.description,
          features: t.features,
        },
      });
    }
  }

  // Pages - real content
  const pages = [
    {
      slug: "hakkimizda",
      tr: {
        title: "Hakkımızda",
        content: `<h2>Kalem Yazılım Hakkında</h2>
<p>1989 yılında kurulan <strong>Kalem Yazılım Sistem Otomasyonları San. Tic. Ltd. Şti.</strong>, perakende ve lojistik sektörüne yönelik ERP çözümleri üreten öncü bir teknoloji şirketidir. Kurulduğu günden bu yana 2.000'in üzerinde projeyi başarıyla hayata geçirmiştir.</p>

<h3>Misyonumuz</h3>
<p>Her projeyi yeni bir analiz fırsatı olarak görerek, müşterilerimizle birlikte iş süreçlerini sürekli iyileştirmek ve sektöre yenilikçi çözümler sunmak.</p>

<h3>Vizyonumuz</h3>
<p>Perakende teknolojilerinde Türkiye'nin ve bölgenin lider yazılım şirketi olmak. 36 ülkede faaliyet gösteren müşteri portföyümüzle global bir teknoloji ortağı olmayı hedefliyoruz.</p>

<h3>Ar-Ge Merkezimiz</h3>
<p>Yıldız Teknik Üniversitesi Teknoloji Geliştirme Bölgesi'nde bulunan Ar-Ge merkezimizde, deneyimli yazılım ekibimiz ile sürekli yenilikçi çözümler geliştiriyoruz.</p>

<h3>Rakamlarla Kalem Yazılım</h3>
<ul>
<li><strong>36</strong> Ülkede Faaliyet</li>
<li><strong>3.000+</strong> Mutlu Müşteri</li>
<li><strong>16</strong> Farklı Ürün Çözümü</li>
<li><strong>10</strong> Kalite Belgesi</li>
<li><strong>35+</strong> Yıllık Sektör Tecrübesi</li>
</ul>

<h3>İş Ortaklarımız</h3>
<p>Logo Yazılım, Ingenico, Venut ve Fastsoft gibi sektörün önde gelen firmalarıyla güçlü iş ortaklıkları yürütüyoruz.</p>`,
        metaTitle: "Hakkımızda - Kalem Yazılım",
        metaDescription: "Kalem Yazılım, 1989'dan bu yana perakende ve lojistik sektörüne ERP çözümleri sunan öncü bir teknoloji şirketidir.",
      },
      en: {
        title: "About Us",
        content: `<h2>About Kalem Software</h2>
<p>Founded in 1989, <strong>Kalem Yazılım Sistem Otomasyonları San. Tic. Ltd. Şti.</strong> is a pioneering technology company producing ERP solutions for the retail and logistics sector. Since its establishment, it has successfully implemented over 2,000 projects.</p>

<h3>Our Mission</h3>
<p>To continuously improve business processes together with our customers by viewing each project as a new analysis opportunity, and to offer innovative solutions to the industry.</p>

<h3>Our Vision</h3>
<p>To be the leading software company in retail technologies in Turkey and the region. We aim to be a global technology partner with our customer portfolio operating in 36 countries.</p>

<h3>Our R&D Center</h3>
<p>At our R&D center located in Yıldız Technical University Technology Development Zone, our experienced software team continuously develops innovative solutions.</p>

<h3>Kalem Software in Numbers</h3>
<ul>
<li><strong>36</strong> Countries</li>
<li><strong>3,000+</strong> Happy Customers</li>
<li><strong>16</strong> Different Product Solutions</li>
<li><strong>10</strong> Quality Certificates</li>
<li><strong>35+</strong> Years of Industry Experience</li>
</ul>

<h3>Our Partners</h3>
<p>We maintain strong business partnerships with leading industry companies such as Logo Software, Ingenico, Venut and Fastsoft.</p>`,
        metaTitle: "About Us - Kalem Software",
        metaDescription: "Kalem Software has been a pioneering technology company providing ERP solutions for retail and logistics since 1989.",
      },
    },
    {
      slug: "destek",
      tr: {
        title: "Destek",
        content: `<h2>Teknik Destek</h2>
<p>Kalem Yazılım teknik destek ekibi, 7/24 hizmetinizdedir.</p>
<h3>İletişim Kanalları</h3>
<ul>
<li><strong>Destek Hattı:</strong> 0850 800 21 21</li>
<li><strong>E-posta:</strong> destek@kalemyazilim.com</li>
<li><strong>Uzaktan Destek:</strong> TeamViewer ile anında bağlantı</li>
</ul>
<h3>Ürün Güncellemeleri</h3>
<p>KL-Retail ürün ailesi için en son güncellemelere destek portalımızdan ulaşabilirsiniz.</p>`,
        metaTitle: "Destek - Kalem Yazılım",
        metaDescription: "Kalem Yazılım teknik destek. 0850 800 21 21 destek hattı ile 7/24 yanınızdayız.",
      },
      en: {
        title: "Support",
        content: `<h2>Technical Support</h2>
<p>Kalem Software technical support team is at your service 24/7.</p>
<h3>Contact Channels</h3>
<ul>
<li><strong>Support Line:</strong> 0850 800 21 21</li>
<li><strong>Email:</strong> destek@kalemyazilim.com</li>
<li><strong>Remote Support:</strong> Instant connection via TeamViewer</li>
</ul>
<h3>Product Updates</h3>
<p>Access the latest updates for the KL-Retail product family from our support portal.</p>`,
        metaTitle: "Support - Kalem Software",
        metaDescription: "Kalem Software technical support. 24/7 support line: 0850 800 21 21.",
      },
    },
  ];

  for (const pg of pages) {
    const page = await prisma.page.upsert({
      where: { slug: pg.slug },
      update: {},
      create: { slug: pg.slug },
    });

    for (const locale of ["tr", "en"] as const) {
      const t = pg[locale];
      await prisma.pageTranslation.upsert({
        where: { pageId_locale: { pageId: page.id, locale } },
        update: { title: t.title, content: t.content, metaTitle: t.metaTitle, metaDescription: t.metaDescription },
        create: {
          pageId: page.id,
          locale,
          title: t.title,
          content: t.content,
          metaTitle: t.metaTitle,
          metaDescription: t.metaDescription,
        },
      });
    }
  }

  // Settings - real stats from site
  const settings = [
    { key: "stat_customers", value: "3000" },
    { key: "stat_experience", value: "36" },
    { key: "stat_products", value: "16" },
    { key: "stat_support", value: "10" },
    { key: "stat_label_1_tr", value: "Müşteri" },
    { key: "stat_label_1_en", value: "Customers" },
    { key: "stat_label_2_tr", value: "Ülke" },
    { key: "stat_label_2_en", value: "Countries" },
    { key: "stat_label_3_tr", value: "Ürün Çözümü" },
    { key: "stat_label_3_en", value: "Product Solutions" },
    { key: "stat_label_4_tr", value: "Kalite Belgesi" },
    { key: "stat_label_4_en", value: "Quality Certificates" },
    { key: "smtp_host", value: "" },
    { key: "smtp_port", value: "587" },
    { key: "smtp_user", value: "" },
    { key: "smtp_pass", value: "" },
    { key: "smtp_from", value: "info@kalemyazilim.com" },
    { key: "contact_to", value: "info@kalemyazilim.com" },
    { key: "site_title_tr", value: "Kalem Yazılım" },
    { key: "site_title_en", value: "Kalem Software" },
    { key: "site_description_tr", value: "Bilginin Anahtarı - Perakende ve Lojistik ERP Çözümleri" },
    { key: "site_description_en", value: "The Key to Information - Retail and Logistics ERP Solutions" },
    { key: "phone", value: "0 (212) 222 21 21" },
    { key: "phone2", value: "0 (212) 320 61 57" },
    { key: "support_phone", value: "0850 800 21 21" },
    { key: "email_sales", value: "satis@kalemyazilim.com" },
    { key: "email_support", value: "destek@kalemyazilim.com" },
    { key: "email_retail", value: "perakende@kalemyazilim.com" },
    { key: "address_tr", value: "Maltepe Mah. Londra Asfaltı Cad. A-B Kısım No: 38 İç Kapı No: K1 Zeytinburnu / İstanbul" },
    { key: "address_en", value: "Maltepe Mah. Londra Asfalti Cad. A-B Section No: 38 Zeytinburnu / Istanbul, Turkey" },
    { key: "address_baku", value: "Həydar Əliyev Pros. 105-N B. 97 M.5 Nərimanov R. Azerbaycan / Bakü" },
    { key: "address_rd", value: "Yıldız Teknik Üniversitesi Teknoloji Geliştirme Bölgesi 1. Etap B Blok K:2 B-412 Davutpaşa / Esenler / İstanbul" },
    { key: "social_twitter", value: "https://twitter.com/kalemyazilimcom" },
    { key: "social_facebook", value: "https://www.facebook.com/kalemyazilimcom" },
    { key: "social_instagram", value: "https://www.instagram.com/kalemyazilimcom" },
    { key: "social_linkedin", value: "https://www.linkedin.com/company/781274" },
    { key: "social_youtube", value: "https://www.youtube.com/channel/UCYQPknm8XxPjO7PaCgeYtpg" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // Real References - companies mentioned on the site
  const refs = [
    { name: "Markafoni", sortOrder: 1 },
    { name: "İstanbul Modern", sortOrder: 2 },
    { name: "KidZania", sortOrder: 3 },
    { name: "Sea Life Akvaryum", sortOrder: 4 },
    { name: "Kafkas Şekerleme", sortOrder: 5 },
    { name: "Beşler Sucuk", sortOrder: 6 },
    { name: "Berem Gıda", sortOrder: 7 },
    { name: "Cankurtaran Gıda", sortOrder: 8 },
    { name: "Kaytur", sortOrder: 9 },
    { name: "Elit Petrol", sortOrder: 10 },
    { name: "Üçbil Bilişim", sortOrder: 11 },
    { name: "Ünpet Lojistik", sortOrder: 12 },
    { name: "YPET", sortOrder: 13 },
    { name: "Hicri Ercili Akaryakıt", sortOrder: 14 },
    { name: "Nab Holding", sortOrder: 15 },
    { name: "Alexander Gardi", sortOrder: 16 },
  ];

  // Delete old refs and create new ones
  await prisma.reference.deleteMany({});
  for (const r of refs) {
    await prisma.reference.create({ data: r });
  }

  // Sample blog posts from real news
  const posts = [
    {
      slug: "ortakalan-bulusuyor-etkinligi",
      coverImage: "/uploads/homepage-referans.jpg",
      tr: {
        title: "Ortakalan Buluşuyor Etkinliğine Katıldık",
        excerpt: "Sektörün önde gelen isimlerinin bir araya geldiği Ortakalan Buluşuyor etkinliğinde yerimizi aldık.",
        content: "<h2>Ortakalan Buluşuyor</h2><p>Sektörün önde gelen isimlerinin bir araya geldiği Ortakalan Buluşuyor etkinliğinde yerimizi aldık. Perakende teknolojilerindeki son gelişmeleri ve yenilikçi çözümlerimizi katılımcılarla paylaştık.</p>",
      },
      en: {
        title: "We Attended the Ortakalan Meeting Event",
        excerpt: "We took our place at the Ortakalan Meeting event where leading names in the sector came together.",
        content: "<h2>Ortakalan Meeting</h2><p>We took our place at the Ortakalan Meeting event where leading names in the sector came together. We shared the latest developments in retail technologies and our innovative solutions with participants.</p>",
      },
    },
    {
      slug: "perakende-dijital-donusum",
      coverImage: "/uploads/homepage-urun.jpg",
      tr: {
        title: "Perakende Sektöründe Dijital Dönüşüm",
        excerpt: "Perakende sektöründe dijital dönüşüm neden önemli ve nasıl başarılı bir şekilde uygulanır?",
        content: "<h2>Perakende Sektöründe Dijital Dönüşüm</h2><p>Dijital dönüşüm, perakende sektöründe artık bir tercih değil, zorunluluk haline geldi. Müşteri beklentilerinin hızla değiştiği günümüzde, teknolojiye yatırım yapmayan işletmeler rekabet gücünü kaybediyor.</p><h3>Dijital Dönüşüm Neden Önemli?</h3><p>Tüketiciler artık online ve offline alışveriş deneyiminin sorunsuz bir şekilde entegre olmasını bekliyor. Omnichannel yaklaşımı benimsemeyen perakendeciler müşteri kaybı yaşıyor.</p><h3>Başarılı Dijital Dönüşüm İçin 5 Adım</h3><ol><li>Mevcut süreçlerin analizi</li><li>Doğru teknoloji seçimi</li><li>Çalışan eğitimi</li><li>Kademeli geçiş planı</li><li>Sürekli iyileştirme</li></ol>",
      },
      en: {
        title: "Digital Transformation in Retail",
        excerpt: "Why is digital transformation important in retail and how can it be successfully implemented?",
        content: "<h2>Digital Transformation in Retail</h2><p>Digital transformation has become a necessity, not a choice, in the retail industry. In today's world where customer expectations are rapidly changing, businesses that don't invest in technology lose their competitive edge.</p>",
      },
    },
    {
      slug: "yeni-nesil-okc-gecisinde-gec-kalmayin",
      tr: {
        title: "Yeni Nesil ÖKC İçin Geç Kalmayın",
        excerpt: "GİB'in yeni nesil ödeme kaydedici cihaz zorunluluğu ile ilgili bilmeniz gerekenler.",
        content: "<h2>Yeni Nesil ÖKC Geçişi</h2><p>Gelir İdaresi Başkanlığı (GİB) tarafından zorunlu tutulan yeni nesil ÖKC geçişi hakkında bilmeniz gereken her şey. Kalem Yazılım olarak Enpos yazarkasa çözümümüzle bu geçişi sorunsuz bir şekilde gerçekleştirmenize yardımcı oluyoruz.</p>",
      },
      en: {
        title: "Don't Be Late for New Generation Cash Registers",
        excerpt: "What you need to know about the new generation payment recording device requirement.",
        content: "<h2>New Generation Cash Register Transition</h2><p>Everything you need to know about the mandatory new generation cash register transition required by the Revenue Administration.</p>",
      },
    },
  ];

  for (const p of posts) {
    const post = await prisma.post.upsert({
      where: { slug: p.slug },
      update: { coverImage: p.coverImage || null },
      create: {
        slug: p.slug,
        published: true,
        publishedAt: new Date(),
        coverImage: p.coverImage || null,
      },
    });

    for (const locale of ["tr", "en"] as const) {
      const t = p[locale];
      await prisma.postTranslation.upsert({
        where: { postId_locale: { postId: post.id, locale } },
        update: { title: t.title, excerpt: t.excerpt, content: t.content },
        create: {
          postId: post.id,
          locale,
          title: t.title,
          excerpt: t.excerpt,
          content: t.content,
        },
      });
    }
  }

  console.log("Seed completed successfully with real data!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
