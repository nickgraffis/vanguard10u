<template>
    <div >
      <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md">
            <form action="https://formcarry.com/s/-U7PLEvqNE" method="POST" accept-charset="UTF-8">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="mt-1 p-2 w-full border rounded-md !ring-2 !ring-gray-700"
              />
            </div>
  
            <div class="mt-4">
              <button
                type="submit"
                class="w-full bg-blue-600 dark:text-white text-gray-700 p-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                Confirm Attendance
              </button>
            </div>
  
            
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup>
import './style.css'
</script>
  