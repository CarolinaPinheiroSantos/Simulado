from django.db import models

class Usuarios(models.Model):
    idUsuario = models.IntegerField()
    nome = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.nome
    
class Tarefa():
    idTarefa = models.IntegerField()
    descricao = models.CharField()
    setor  = models.

