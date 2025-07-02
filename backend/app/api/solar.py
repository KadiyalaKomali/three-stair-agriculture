from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_solar_data():
    return {"solar": "Solar data loaded"}
