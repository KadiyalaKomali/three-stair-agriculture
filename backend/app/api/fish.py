from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_fish_data():
    return {"fish": "Fish data loaded"}
