import os

import psycopg2
from fastapi import FastAPI, HTTPException

app = FastAPI()

TABLE_NAME = "tasks"
STATUS_COLUMN = "status"
KNOWN_STATUSES = ["todo", "in_progress", "done"]


def get_connection():
    return psycopg2.connect(
        host=os.environ["DB_HOST"],
        port=os.environ.get("DB_PORT", "5432"),
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        connect_timeout=3,
    )


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/stats")
def get_stats():
    counts = {status: 0 for status in KNOWN_STATUSES}

    try:
        connection = get_connection()
    except psycopg2.OperationalError:
        raise HTTPException(
            status_code=503,
            detail="stats-api ne parvient pas à joindre la base de données",
        )

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT {STATUS_COLUMN}, COUNT(*) "
                f"FROM {TABLE_NAME} "
                f"GROUP BY {STATUS_COLUMN}"
            )

            for status, count in cursor.fetchall():
                counts[status] = count
    finally:
        connection.close()

    return counts