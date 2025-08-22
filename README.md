# Computer Vision Lab
Istraživačkova laboratorija
Interaktivna platforma za učenje algoritama kompjuterskog vida koristeći React, OpenCV.js i shadcn/ui komponente.

## 🎯 Funkcionalnosti

### Učitavanje slika
- **Drag & Drop** - prevucite sliku direktno u aplikaciju
- **File Upload** - kliknite za odabir slike sa računara
- **Primeri slika** - predefinisane slike za brzi test
- **Kamera** - snimanje slike direktno iz kamere (u razvoju)

### Algoritmi kompjuterskog vida
Aplikacija podržava sledeće kategorije algoritama:

#### 🔵 Filtriranje
- **Gaussian Blur** - glatko zamagljenje za smanjenje šuma
- **Median Blur** - efikasno uklanjanje salt-and-pepper šuma
- **Bilateral Filter** - čuva ivice dok smanjuje šum

#### ⚡ Detekcija ivica
- **Canny Edge Detection** - precizna detekcija ivica
- **Sobel Edge Detection** - gradijent bazirana detekcija
- **Laplacian Edge Detection** - osetljiv na promene intenziteta

#### 🔻 Morfološke operacije
- **Erosion** - smanjuje objekte i povećava rupice
- **Dilation** - povećava objekte i smanjuje rupice
- **Opening** - kombinacija erozije i dilatacije
- **Closing** - popunjava male rupice

#### 📍 Detekcija karakteristika
- **Harris Corner Detection** - detekcija uglova u slici

#### ⚫ Segmentacija
- **Adaptive Threshold** - adaptivna binarizacija

### Interaktivni parametri
- **Slideri** - za numeričke vrednosti (kernel size, threshold, itd.)
- **Select boxovi** - za odabir metoda i opcija
- **Real-time preview** - trenutni prikaz rezultata

### Prikaz rezultata
- **Split view** - originalna i obrađena slika pored
- **Toggle** - uključivanje/isključivanje prikaza rezultata
- **Download** - preuzimanje obrađenih slika
- **Statistike** - vreme obrade i informacije o algoritmu

## 🛠️ Tehnologije

- **Frontend**: React 18 + TypeScript
- **UI Komponente**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Computer Vision**: OpenCV.js (CDN)
- **Build Tool**: Vite

## 🚀 Pokretanje

1. **Instalacija zavisnosti**
   ```bash
   npm install
   ```

2. **Pokretanje development servera**
   ```bash
   npm run dev
   ```

3. **Otvorite aplikaciju**
   - Idite na `http://localhost:5173`
   - Aplikacija će se automatski osvežavati pri promenama

## 📁 Struktura projekta

```
src/
├── components/
│   ├── ui/           # shadcn/ui komponente
│   ├── ImageUpload.tsx
│   ├── AlgorithmPanel.tsx
│   └── ImageDisplay.tsx
├── data/
│   ├── algorithms.ts # definicije algoritama
│   └── sample-images.ts
├── lib/
│   ├── utils.ts      # utility funkcije
│   └── opencv.ts     # OpenCV.js wrapper
├── types/
│   └── cv.ts         # TypeScript tipovi
└── App.tsx           # glavna komponenta
```

## 🎨 Korišćenje

1. **Učitajte sliku**
   - Prevucite sliku u označenu zonu ili
   - Kliknite "Odaberi fajl" ili
   - Odaberite jednu od primer slika

2. **Odaberite algoritam**
   - Kliknite na algoritam iz liste
   - Podesite parametre pomoću slidera i select boxova

3. **Primenite algoritam**
   - Kliknite "Primeni algoritam"
   - Sačekajte da se obrada završi

4. **Pogledajte rezultate**
   - Usporedite originalnu i obrađenu sliku
   - Preuzmite rezultat ako želite
   - Pogledajte statistike obrade

## 🔧 Konfiguracija

### Dodavanje novog algoritma

1. Dodajte definiciju u `src/data/algorithms.ts`:
   ```typescript
   {
     id: 'novi-algoritam',
     name: 'Novi Algoritam',
     description: 'Opis algoritma...',
     category: 'filtering',
     icon: '🔵',
     parameters: [
       {
         id: 'param1',
         name: 'Parametar 1',
         type: 'slider',
         min: 0,
         max: 100,
         defaultValue: 50
       }
     ]
   }
   ```

2. Implementirajte logiku u `src/lib/opencv.ts`:
   ```typescript
   case 'novi-algoritam':
     // OpenCV.js implementacija
     break;
   ```

### Prilagođavanje stilova

- Koristite Tailwind CSS klase za stilizovanje
- shadcn/ui komponente su već stilizovane
- Možete prilagoditi teme u `src/index.css`

## 🌟 Prednosti

- **Interaktivno učenje** - vidite efekte algoritama u realnom vremenu
- **Bez servera** - sve se izvršava u brauzeru
- **Moderna UI** - lep i intuitivan interfejs
- **Edukativno** - jasni opisi i kategorije algoritama
- **Performantno** - optimizovano za brzo učitavanje

## 🔮 Budući razvoj

- [ ] Podrška za video stream
- [ ] Više algoritama (SIFT, SURF, itd.)
- [ ] Batch processing
- [ ] Export/import konfiguracija
- [ ] Dark mode
- [ ] Mobilna optimizacija

## 📝 Licenca

MIT License - slobodno koristite za edukativne i komercijalne svrhe.

---

**Napomena**: Ova aplikacija koristi OpenCV.js koji se učitava sa CDN-a. Za produkciju, preporučujemo lokalno hostovanje OpenCV.js fajlova.
