# 🚀 HIPPY Content Agent – Deployment Guide

**Áno, toto je jednoduché. Budeme to robiť krok za krokom.**

---

## **FÁZA 1: GitHub (5 minút)**

Potrebuješ **GitHub účet** (zadarmo). Ak ho nemáš:
1. Vojdi na https://github.com
2. Klikni **"Sign up"**
3. Vyplň email, heslo, username
4. Potvrď email

**Hotovo.** Teraz máš GitHub.

---

## **FÁZA 2: Uploaduj kód na GitHub (10 minút)**

Máš 2 možnosti. Vyber si ľahší.

### **OPTION A: Cez GitHub Web (NAJĽAHŠIE – neurobiť nič z príkazoveho riadku)**

1. Vojdi na https://github.com a prihlásiť sa
2. Klikni **"+"** (hore vpravo) → **"New repository"**
3. Pomenuj: `hippy-content-agent`
4. Vyber **"Public"**
5. Klikni **"Create repository"**
6. Uvidíš stránku s inštrukciami – ignoruj to teraz
7. Na tej stránke hľadaj tlačidlo **"uploading an existing file"** alebo **"Add file"** → **"Upload files"**
8. **Vyber všetky súbory z outputs zložky** (vyrá bez adresárov):
   - `hippy-agent.jsx`
   - `index.js`
   - `index.css`
   - `package.json`
   - `tailwind.config.js`
   - `vercel.json`
   - `.gitignore`
   - `README.md`

9. **Súbor `public/index.html` uploaduj zvlášť** (vytvor zložku "public")

**Hotovo!** Máš repo na GitHube. 🎉

### **OPTION B: Cez Command Line (ak vieš Git)**

```bash
cd /path/to/hippy-content-agent/outputs
git init
git add .
git commit -m "Initial commit: HIPPY Content Agent"
git branch -M main
git remote add origin https://github.com/TVOJ_USERNAME/hippy-content-agent.git
git push -u origin main
```

---

## **FÁZA 3: Deploy na Vercel (3 minúty)**

1. Vojdi na https://vercel.com
2. Klikni **"Sign up"** (alebo "Log in" ak máš účet)
3. Vyber **"Continue with GitHub"** a autorizuj
4. Vrátiš sa na Vercel dashboard
5. Klikni **"Add New"** → **"Project"**
6. Hľadaj **"hippy-content-agent"** v liste repozitárov a klikni **"Import"**
7. Nastavenia: **VŠETKO NECHÁŠ NA DEFAULT** (nebude sa pýtať na env variables)
8. Klikni **"Deploy"**
9. Čakaj ~2-3 minúty, kým Vercel buduje a deployuje

**HOTOVO! 🚀**

Uvidíš zelenou správu: **"Deployment successful"**

---

## **FÁZA 4: Skopíruj si app URL**

Na Vercel dashboarde vidíš niečo ako:
```
https://hippy-content-agent.vercel.app
```

**Toto je tvoja URL.** Otvor ju v prehliadači – tvoja app funguje! 🎉

---

## **FÁZA 5: Konfiguruj API keys v apke (2 minúty)**

Keď otvoríš app:

1. Klikni **Settings** (⚙️ vpravo hore)
2. Vlož:

   - **Anthropic API Key:** Skopíruj svoj skutočný API key z https://console.anthropic.com (začína s `sk-ant-`)
   - **Notion Integration Token:** Skopíruj svoj skutočný token z https://www.notion.so/profile/integrations (začína s `ntn_`)
   - **Notion Database ID:** `3506d575a8b8803f910dec6b5e0f95ce` (ten z linku tvojej Notion stránky)

3. Klikni **"Uložiť nastavenia"**

**HOTOVO!** 🎊

---

## **FÁZA 6: Testuj app**

1. Klikni na tab **"Caption Generator"**
2. Nahraj akúkoľvek fotku (smartphone fotka OK)
3. Vlož popis: "Test legíny, čierne, Econyl"
4. Klikni **"Generovať caption"**
5. Počkaj 10-15 sekúnd...

**Áno, funguje! 🎉**

---

## **Odteraz...**

**Workflow:**

```
KAŽDÝ DEŇ:
1. Otvor: https://hippy-content-agent.vercel.app
2. Generuj captions (nahraj fotka → klikni tlačidlo)
3. Uložiť do Notionu (1 klik)

KAŽDÝ PONDELOK:
1. Klikni "Týždenný plán" tab
2. Generuj plán na týždeň
3. Uložiť do Notionu
4. Maš konkrétnu checklist na 7 dní
```

---

## **Problémy?**

### **"Vercel hovorí 'build failed'"**
- Skontroluj či máš všetky súbory (najmä `public/index.html`)
- Čakaj 5 minút a skúsiť znova

### **"API error: Invalid API key"**
- Skontroluj či je tvoj API key správny (bez medzier)
- Regeneruj si kľúč v console.anthropic.com ak potrebuješ

### **"Notion error: Invalid token"**
- Skontroluj či si skopíroval token správne
- Skontroluj či si pripojiť integráciu k Content Calendar stránke (connections → connect)

---

## **Budeš potrebovať na budúcnosť?**

Keď budete chcieť:
- **Automatické postovanie na Instagram** → Setup Make.com workflow
- **Email reminders na pondelok** → Zapier alebo Make.com
- **Ďalšie AI features** → Povieš mi a updatujem app

---

**Čas:** 30 minút max  
**Cena:** Free (Vercel free tier, Notion free tier)  
**Otázky?** Pošli mi screenshot kde sa zasekneš 🤗

---

*Vytvoriť: Claude + Nicole Deržáková*
