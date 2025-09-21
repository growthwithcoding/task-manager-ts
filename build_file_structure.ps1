# build_file_structure.ps1
# Script to quickly scaffold the project folder + files
# Run this once inside your project root to create the structure

# Make directories
New-Item -ItemType Directory -Force -Path src, src\routes, src\auth, src\types, src\state, src\data, src\pages, src\components, src\styles, src\ui

# Core files
New-Item -ItemType File -Force -Path .env
New-Item -ItemType File -Force -Path .env.example
New-Item -ItemType File -Force -Path src\main.tsx
New-Item -ItemType File -Force -Path src\App.tsx

# Routing
New-Item -ItemType File -Force -Path src\routes\router.tsx
New-Item -ItemType File -Force -Path src\routes\ProtectedRoute.tsx

# Auth
New-Item -ItemType File -Force -Path src\auth\AuthProviderWithHistory.tsx

# State
New-Item -ItemType File -Force -Path src\state\TaskContext.tsx
New-Item -ItemType File -Force -Path src\state\taskReducer.ts
New-Item -ItemType File -Force -Path src\state\useTasks.ts

# Data
New-Item -ItemType File -Force -Path src\data\taskService.ts

# Pages
New-Item -ItemType File -Force -Path src\pages\Dashboard.tsx
New-Item -ItemType File -Force -Path src\pages\TaskDetails.tsx
New-Item -ItemType File -Force -Path src\pages\TaskCreate.tsx
New-Item -ItemType File -Force -Path src\pages\TaskEdit.tsx

# Components
New-Item -ItemType File -Force -Path src\components\TaskList.tsx
New-Item -ItemType File -Force -Path src\components\TaskItem.tsx
New-Item -ItemType File -Force -Path src\components\TaskForm.tsx

# Styles + UI
New-Item -ItemType File -Force -Path src\styles\globals.css
New-Item -ItemType File -Force -Path src\ui\Toast.tsx
