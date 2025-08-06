# Three-Body System - CI/CD, Kubernetes, Logging & DRC

## 📦 Deskripsi Proyek

Sistem ini terdiri dari tiga layanan utama:

* **Frontend** (React)
* **Backend GO** (Golang REST API)
* **Backend Laravel** (Laravel REST API + MySQL)

Setiap layanan di-deploy ke Kubernetes dan dikelola secara otomatis menggunakan CI/CD GitHub Actions. Logging dari semua service dikirim ke Grafana Loki menggunakan Promtail yang berjalan di VM berbeda.
Arsitektur 

---

## 🚀 Cara Menjalankan Aplikasi

### 1. **Persiapan Environment**

* Menggunakan 2 VM local berbasic Virtual Box
<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/a8cd5949-d74e-4c9f-a56e-8a58665ea10e" />

* Pastikan cluster Kubernetes sudah aktif
* Namespace: `three-body`
* MySQL berjalan sebagai pod dengan nodePort (misal: 30306)
* Promtail berjalan di VM eksternal dan scraping ke `/var/log/pods` (jika tersedia)

### 2. **CI/CD via GitHub Actions**

* Setiap push ke branch `main` akan menjalankan job berikut:

  * Build image untuk `frontend`, `go`, dan `laravel`
  * Push ke Docker Hub
  * Deploy YAML ke Kubernetes (via runner sendiri: `self-hosted, Linux, X64`)

*Semua Service yang diperlukan dikumpulkan di satu yml .github/workflows/ci-cd-k8s.yml*

### 3. **Deploy Manual (Opsional)**

```bash
kubectl replace --force -f k8s/ci-cd-k8s.yml
```

### 4. **Rate Limiting**

<img width="442" height="662" alt="image" src="https://github.com/user-attachments/assets/8d4f114e-551b-426a-bdda-4b919d7ad2d7" />

### 5. **MultiStage Build dan Non-Root** (NodePort)

Hasil Pekerjaan ada di screenshot ✅ CI/CD GitHub Actions

### 6. **Akses Service** (NodePort)

| Service         | Port  | URL Format                             |
| --------------- | ----- | -------------------------------------- |
| Frontend        | 30080 | http://frontend.local:30080              |
| Backend Go      | 30808 | http://frontend.local:30808/api/products |
| Backend Laravel | 30801 | http://frontend.local:30801/api/products |
| MySQL           | 30306 | 192.168.100.41:30306 (nodePort)        |

---

## 🧱 Arsitektur Sistem

```
     +-------------+           +------------------+
     |   Frontend  |<--------->|   Backend Laravel |
     +-------------+           +------------------+
             |                        |
             |                        v
             |                +---------------+
             |                |   MySQL DB    |
             |                +---------------+
             |
             v
     +-------------+          
     |  Backend Go  |  
     +-------------+          
             |
             v
         [Logging]
      Promtail --> Loki --> Grafana
```

---

## 🧪 Observability

### 🔍 Logging Service

* Promtail diinstall di VM Linux dan membaca log dari `/var/log/containers` dan file mounted lain
* Scrape config berdasarkan pattern `*frontend*`, `*go*`, `*laravel*`
* Semua log ditampilkan di Grafana dashboard

### 📊 Grafana Panel

Setiap service memiliki panel tersendiri berdasarkan label `filename` atau `job`.

---

## 📸 Screenshot Hasil Pekerjaan

### ✅ CI/CD GitHub Actions

<img width="656" height="886" alt="image" src="https://github.com/user-attachments/assets/1545843c-6671-48fe-8f07-244fa48c514d" />

<img width="1501" height="740" alt="image" src="https://github.com/user-attachments/assets/9f5e8d19-c66c-4089-95d1-1750f94ccda8" />

<img width="1353" height="426" alt="image" src="https://github.com/user-attachments/assets/c592d500-618a-4cf3-a353-fbb6bb7255d5" />

<img width="1068" height="517" alt="image" src="https://github.com/user-attachments/assets/f671adc7-5530-48b2-8a27-fbc3be8d42af" />

<img width="684" height="215" alt="image" src="https://github.com/user-attachments/assets/7c25ccc6-a46b-4391-bf5a-1f5e8a9fdb32" />

<img width="1098" height="577" alt="image" src="https://github.com/user-attachments/assets/8e02e955-0508-48b1-9524-6ade96e0d3b3" />

<img width="900" height="320" alt="image" src="https://github.com/user-attachments/assets/ea0ac480-ce0d-4020-b1ae-86ef093ecfc9" />

<img width="1364" height="304" alt="image" src="https://github.com/user-attachments/assets/b68c9e5e-d958-4b05-a2ec-3e5d2dbacb45" />


### 🖥️ Penyesuaian Constring

<img width="713" height="369" alt="image" src="https://github.com/user-attachments/assets/505cae04-6dd9-49ac-ad9a-c03033847e0a" />

<img width="613" height="423" alt="image" src="https://github.com/user-attachments/assets/59a1e9e9-8bc9-40fd-85ef-57e4d07ac269" />

<img width="617" height="481" alt="image" src="https://github.com/user-attachments/assets/fb2c173d-c97c-4fcc-8781-54490a07c54c" />


### 🔍 Aplikasi Berjalan

<img width="1882" height="980" alt="image" src="https://github.com/user-attachments/assets/2dc0201d-f8e9-494f-a0b6-783da8c1329e" />

<img width="1862" height="889" alt="image" src="https://github.com/user-attachments/assets/53bdd26e-fe43-4136-b70a-3b0dd993ef4c" />

<img width="1863" height="897" alt="image" src="https://github.com/user-attachments/assets/02a36bd2-60bf-454c-9ece-012d518b5713" />


### 📈 Dashboard Grafana

<img width="1865" height="975" alt="image" src="https://github.com/user-attachments/assets/531a098f-1ec4-405d-a5e5-0f14653a5ea6" />

<img width="1865" height="811" alt="image" src="https://github.com/user-attachments/assets/04b03fd1-a354-41e6-9429-ccd3c4581ee3" />

<img width="1841" height="862" alt="image" src="https://github.com/user-attachments/assets/47e3f0ce-c9a8-4991-bf7d-dc3858446176" />

<img width="1856" height="869" alt="image" src="https://github.com/user-attachments/assets/3c02780d-dabc-433e-9616-9ea9f2c121d8" />

<img width="1587" height="147" alt="image" src="https://github.com/user-attachments/assets/f22925c1-fac5-4ec1-8798-024884de059d" />

<img width="1615" height="856" alt="image" src="https://github.com/user-attachments/assets/4a303c29-bf7f-4568-80af-bea02f2d8569" />

---

## 📁 Struktur File Penting

```
.
├── frontend/
├── backend-go/
├── backend-laravel/
├── k8s/
│   ├── frontend.yml
│   ├── backend-go.yml
│   ├── backend-laravel.yml
│   ├── mysql.yml
├── .github/
│   └── workflows/
│       └── ci-cd-k8s.yml
└── README.md
```

---

## 📁 Topologi Arsitektur DR dan DRC 

![Body Problem](https://github.com/user-attachments/assets/dded5ae9-5000-4869-be26-ee3a18aaa5cf)


