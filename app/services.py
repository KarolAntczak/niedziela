import calendar
import datetime

from app import mongo

SUNDAY_WEEKDAY = 6


def is_sunday_today():
    return datetime.datetime.now().weekday() is SUNDAY_WEEKDAY


def get_next_sunday():
    now = datetime.datetime.now()
    if now.weekday() is SUNDAY_WEEKDAY:
        return now
    days_ahead = SUNDAY_WEEKDAY - now.weekday()
    if days_ahead <= 0:
        days_ahead += 7
    return now + datetime.timedelta(days_ahead)


def get_month_name(d):
    return calendar.month_name[d.month]


def is_shopping_day(d):

    startDate = d.replace(hour=0, minute=0, second=0, microsecond=0)
    endDate = d.replace(hour=23, minute=59, second=59, microsecond=999)

    print(startDate)
    print(endDate)
    is_shopping = mongo.db.working_sundays.find({"date":  {
                         "$gte": startDate,
                          "$lt": endDate }
                 }).count(with_limit_and_skip=True) > 0
    print(is_shopping)
    return is_shopping


def get_working_sundays(year, month):
    year = int(year)
    month = int(month)
    startDate = datetime.datetime(year=year, month=month, day=1)
    endDate = datetime.datetime(year=year, month=month, day=calendar.monthrange(year, month)[1])
    working_sundays = mongo.db.working_sundays.find({"date":  {
                         "$gte": startDate,
                          "$lt": endDate},
                 },
        {"date": True, "_id": 0})
    return list(working_sundays)

