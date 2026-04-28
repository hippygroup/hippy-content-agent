# 🌿 HIPPY Content Planning Agent

AI-powered Instagram content generator pre značku HIPPY. Generuje captions, hashtags, video skripts a týždenné plány obsahu s priamou integráciou do Notion.

## ✨ Features

- **Caption Generator** – Nahraj fotku produktu, agent vygeneruje 3 caption varianty + hashtags
- **Weekly Planner** – Konkrétne ideáky čo fotit/videovať v budúcom týždni
- **Notion Sync** – Vše sa automaticky uloží do tvojej Notion databázy
- **Best Posting Times** – Agent navrhuje optimálny čas na postovanie
- **Video Scripts** – Ideas na Instagram Reels a Stories

## 🚀 Deployment na Vercel (2 minúty)

### Krok 1: Priprav GitHub repo

```bash
git init
git add .
git commit -m "Initial commit"
```

Pushni na GitHub:
```bash
git remote add origin https://github.com/TVOJE_USERNAME/hippy-content-agent.git
git branch -M main
git push -u origin main
```

### Krok 2: Deploy na Vercel

1. Vojdi na https://vercel.com
2. Klikni **"Add New"** → **"Project"**
3. Vyber GitHub repo **"hippy-content-agent"**
4. Klikni **"Deploy"**
5. Čakaj ~2 minúty

**Gotovo!** Máš URL: `https://hippy-content-agent.vercel.app`

## ⚙️ Setup v apke

1. Otvor app na Vercel URL
2. Klikni **Settings** (ozubené koliesko vpravo hore)
3. Vlož:
   - **Anthropic API Key** – `sk-ant-...` (z https://console.anthropic.com)
   - **Notion Integration Token** – `ntn_...` (z https://www.notion.so/profile/integrations)
   - **Notion Database ID** – `3506d575a8b8803f910dec6b5e0f95ce`
4. Klikni **Uložiť nastavenia**

## 📝 Jak používať

### Caption Generator
1. Nahraj fotku produktu
2. Popíš produkt (napr. "Legíny SUNSET, čierne, Econyl")
3. Klikni **Generovať caption**
4. Skopíruj/edituj text alebo klikni **Uložiť do Notionu**

### Weekly Planner
1. Klikni tab **"Týždenný plán"**
2. Klikni **"Vygeneruj týždenný plán"**
3. Uvidíš konkrétne ideáky na ďalších 7 dní
4. Uložiš to do Notionu

## 🔐 Bezpečnosť

- API key a Notion token sú uložené **len lokálne** v tvojom prehliadači (localStorage)
- Nikto ho nemôže vidieť okrem teba
- Vercel nemá prístup k tvojim kľúčom

## 📱 Mobile Support

App funguje aj na mobile! Všetko je responsive.

## ❓ FAQ

**Q: Ako zmeníť farby?**  
A: V `index.css` a `tailwind.config.js` zmeň Tailwind farby.

**Q: Koľko API kreditu stojí?**  
A: Každý caption stojí ~$0.01, tydenný plán ~$0.05. Závislí od lengthu.

**Q: Ako nastaviť automatické postovanie?**  
A: To robíme v Make.com workflow – samostatnú dokumentáciu spraviš.

---

Vytvoriť by Nicole Deržáková x Claude 🤝
