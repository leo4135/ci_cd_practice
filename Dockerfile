# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY ./src ./src

# Указываем порт, который использует приложение
EXPOSE 8000

# Запускаем приложение
CMD ["sh", "-c", "cd src && node server.js"]

