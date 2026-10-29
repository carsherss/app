from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CARSHERS API",
    version="0.1.0",
    description="Shared API for CARSHERS customer app, employee app and CRM.",
)

# Restrict these origins before production. Do not use wildcard CORS with credentials.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok", "service": "carshers-api"}


@app.get("/", tags=["system"])
def root() -> dict[str, str]:
    return {
        "name": "CARSHERS API",
        "version": "0.1.0",
        "docs": "/docs",
        "notice": "Starter API only; booking and authentication routes are not implemented.",
    }
