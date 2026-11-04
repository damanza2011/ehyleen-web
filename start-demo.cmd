@echo off
title EHYLEEN - Portal de Paisajismo y Jardineria de Alta Gama
echo ===============================================================
echo   Iniciando Servidor Local EHYLEEN en Puerto 8097...
echo ===============================================================
start http://127.0.0.1:8097/
python -m http.server 8097
pause
