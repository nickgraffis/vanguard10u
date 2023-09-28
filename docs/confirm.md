---
layout: home
---

<script setup>
    import './components/style.css'
</script>

<style>
    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    button[type=submit] {
        background-color: #4CAF50 !important;
        color: white !important;
        padding: 14px 20px !important;
        margin: 8px 0 !important;
        border: none !important;
        cursor: pointer !important;
        border-radius: 4px !important;
    }
</style>

<div class="w-screen h-screen flex flex-col items-center justify-center">
<h1>Confirm Attendance for Evan Cousineau Cup October 7th - 8th</h1>
    <form class="flex flex-col" action="https://formcarry.com/s/-U7PLEvqNE" method="POST" accept-charset="UTF-8">
        <input type="text" name="name" placeholder="Name" required />
        <input type="hidden" name="_gotcha" />
        <button type="submit">Confirm Attendance</button>
    </form>
</div>
