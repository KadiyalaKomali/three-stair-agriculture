from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_poultry_data():
    return {"poultry": "Poultry data loaded"}
