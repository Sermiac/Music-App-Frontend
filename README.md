# **Music App – Frontend**

A simple music discovery web app built with **React** and **Vite**, powered by the **Spotify Web API**.
Users can browse new releases and search for tracks with album artwork and artist information.


## **Deployed Website URL**

https://music-app-miguel.netlify.app/


## **Backend repo**

> https://github.com/Sermiac/Music-App-Backend

## **Features**

- Browse the latest music releases.
- Search tracks by name.
- View track details including:
  - Track title
  - Artist
  - Album name
  - Album cover

- Fully responsive design.
- Connects to a custom FastAPI backend hosted on Render.


## **Tech Stack**

### **Frontend**

- React (Vite)
- Axios / Fetch API
- CSS / Tailwind (if applicable)

### **Backend**

- FastAPI (Python)
- Uvicorn
- Spotify Web API (Client Credentials Flow)

### **Deployment**

- Frontend deployed on **Netlify**
- Backend deployed on **Render**


## **Project Setup**

### **1. Install dependencies**

```
npm install
```

### **2. Start development server**

```
npm run dev
```

The app will run at:

```
http://localhost:5173/
```


## **Environment Variables**

Create a `.env` file in the project root:

```
VITE_BACKEND_URL=http://localhost:8000
```


## **Build for production**

```
npm run build
```

This generates the production-ready files in the `dist/` folder.


## **Deployment**

The app can be deployed to any static hosting provider.


## **API Endpoints (from backend)**

### **Get new releases**

```
GET /backend/new-releases
```

### **Search tracks**

```
GET /backend/search-tracks?search=<query>
```

Returns a normalized list of tracks with:

- id
- name
- artist
- album
- album cover image


## **License**

This project uses GNU license.

