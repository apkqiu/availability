class Reference:
    def __init__(self,value):
        self.value = value
    def __getattribute__(self, name):
        if name not in ('__getattribute__','value','__init__','__class__'):
            return getattr(self.value,name)
        return object.__getattribute__(self,name)