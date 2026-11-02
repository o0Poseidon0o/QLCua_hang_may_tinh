<template>
  <div class="space-y-16 pb-16">
    <!-- 1. Hero Banner -->
    <section class="relative bg-gradient-to-br from-slate-950 via-[#014f2b] to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span>💼</span> {{ config.heroBadge }}
          </span>
          <h1 class="text-3xl sm:text-5xl font-black leading-tight">
            {{ config.heroTitle }}
          </h1>
          <p class="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {{ config.heroDescription }}
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <a
              href="#survey-form"
              class="px-6 py-3 bg-[#00733c] hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Yêu Cầu Khảo Sát Tận Nơi (Miễn Phí) &rarr;
            </a>
            <a
              :href="'tel:' + config.hotline"
              class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              Hotline Tư Vấn Doanh Nghiệp: <strong class="text-amber-300 text-sm">{{ config.hotline }}</strong>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 grid grid-cols-2 gap-4">
          <div
            v-for="(stat, idx) in config.stats"
            :key="idx"
            class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 text-center space-y-1"
          >
            <div
              class="text-3xl font-black"
              :class="
                idx === 0
                  ? 'text-emerald-400'
                  : idx === 1
                  ? 'text-amber-300'
                  : idx === 2
                  ? 'text-blue-400'
                  : 'text-purple-400'
              "
            >
              {{ stat.value }}
            </div>
            <div class="text-xs text-slate-300">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Pricing Packages (Các Gói Dịch Vụ - Động từ Admin) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">{{ config.sectionSubtitle }}</span>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900">{{ config.sectionTitle }}</h2>
        <p class="text-xs text-slate-500">{{ config.sectionDesc }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div
          v-for="pkg in config.packages"
          :key="pkg.id"
          :class="[
            'rounded-3xl p-7 transition flex flex-col justify-between space-y-6 relative',
            pkg.isPopular
              ? 'bg-gradient-to-b from-[#014f2b] to-[#00733c] text-white shadow-2xl transform md:-translate-y-2 border-2 border-emerald-400'
              : 'bg-white shadow-sm border border-slate-200 hover:shadow-xl text-slate-800',
          ]"
        >
          <div
            v-if="pkg.isPopular"
            class="absolute -top-3 right-6 bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow"
          >
            {{ pkg.popularLabel || 'Phổ Biến Nhất' }}
          </div>

          <div class="space-y-4">
            <span
              class="px-3 py-1 text-xs font-black uppercase rounded-full inline-block"
              :class="pkg.isPopular ? 'bg-white/20 text-emerald-200' : 'bg-emerald-50 text-[#00733c]'"
            >
              {{ pkg.name }}
            </span>

            <div class="space-y-1">
              <div
                class="text-2xl sm:text-3xl font-black"
                :class="pkg.isPopular ? 'text-amber-300' : 'text-slate-900'"
              >
                {{ formatPrice(pkg.price) }}
              </div>
              <div
                class="text-xs"
                :class="pkg.isPopular ? 'text-emerald-200' : 'text-slate-400'"
              >
                {{ pkg.unit }}
              </div>
            </div>

            <p
              class="text-xs leading-relaxed"
              :class="pkg.isPopular ? 'text-emerald-100' : 'text-slate-500'"
            >
              {{ pkg.description }}
            </p>

            <div
              class="border-t pt-4 space-y-2.5 text-xs"
              :class="pkg.isPopular ? 'border-white/20 text-emerald-50' : 'border-slate-100 text-slate-700'"
            >
              <div
                v-for="(feat, fIdx) in pkg.features"
                :key="fIdx"
                class="flex items-start gap-2"
                :class="!feat.included ? 'opacity-50' : ''"
              >
                <span
                  class="font-bold"
                  :class="
                    !feat.included
                      ? 'text-slate-400'
                      : pkg.isPopular
                      ? 'text-amber-300'
                      : 'text-emerald-600'
                  "
                >
                  {{ feat.included ? '✓' : '✕' }}
                </span>
                <span>{{ feat.text }}</span>
              </div>
            </div>
          </div>

          <a
            href="#survey-form"
            :class="[
              'w-full py-3.5 font-extrabold text-xs rounded-xl transition text-center block',
              pkg.isPopular
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg'
                : 'bg-slate-100 hover:bg-emerald-50 hover:text-[#00733c] text-slate-800',
            ]"
          >
            {{ pkg.ctaText }}
          </a>
        </div>
      </div>
    </section>

    <!-- 3. What We Do (Hạng Mục Công Việc) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 space-y-8">
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 text-center">
          {{ config.tasksTitle }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div
            v-for="(task, tIdx) in config.tasks"
            :key="tIdx"
            class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
          >
            <div class="text-2xl">{{ task.icon }}</div>
            <h4 class="font-bold text-sm text-slate-900">{{ task.title }}</h4>
            <p class="text-slate-500 leading-relaxed">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Survey Request Form -->
    <section id="survey-form" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 space-y-6">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Khảo Sát Tận Nơi Miễn Phí</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">ĐĂNG KÝ TƯ VẤN & BÁO GIÁ IT DOANH NGHIỆP</h2>
          <p class="text-xs text-slate-500">Chuyên gia IT của Nhân Phúc Tech sẽ đến tận văn phòng khảo sát và lập phương án tối ưu nhất.</p>
        </div>

        <form @submit.prevent="submitSurvey" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tên công ty / Doanh nghiệp *</label>
              <input
                v-model="surveyForm.company"
                type="text"
                required
                placeholder="Công ty TNHH ABC"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Người liên hệ *</label>
              <input
                v-model="surveyForm.contactPerson"
                type="text"
                required
                placeholder="Anh / Chị Nguyễn Văn A"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
              <input
                v-model="surveyForm.phone"
                type="tel"
                required
                placeholder="0912 345 678"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Quy mô số lượng máy tính *</label>
              <select
                v-model="surveyForm.computerCount"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
              >
                <option value="Dưới 10 máy">Dưới 10 máy tính</option>
                <option value="10 - 25 máy">Từ 10 đến 25 máy tính</option>
                <option value="25 - 50 máy">Từ 25 đến 50 máy tính</option>
                <option value="Trên 50 máy + Server">Trên 50 máy tính + Máy chủ Server</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Địa chỉ văn phòng công ty</label>
            <input
              v-model="surveyForm.address"
              type="text"
              placeholder="Tòa nhà, số đường, quận..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Yêu cầu cụ thể</label>
            <textarea
              v-model="surveyForm.notes"
              rows="3"
              placeholder="Ví dụ: Cần bảo trì định kỳ máy in và máy tính văn phòng, hệ thống wifi hay bị ngắt kết nối..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            GỬI YÊU CẦU KHẢO SÁT MIỄN PHÍ &rarr;
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useSiteContentStore } from '../../stores/siteContent';

const siteContentStore = useSiteContentStore();
const config = computed(() => siteContentStore.itOutsourcing);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};

const surveyForm = ref({
  company: '',
  contactPerson: '',
  phone: '',
  computerCount: '10 - 25 máy',
  address: '',
  notes: '',
});

const submitSurvey = () => {
  siteContentStore.addSurveyLead({ ...surveyForm.value });
  ElMessage.success({
    message: `Cảm ơn ${surveyForm.value.contactPerson}! Yêu cầu khảo sát của ${surveyForm.value.company} đã được chuyển tới bộ phận IT Nhân Phúc Tech.`,
    duration: 3500,
  });
  surveyForm.value = {
    company: '',
    contactPerson: '',
    phone: '',
    computerCount: '10 - 25 máy',
    address: '',
    notes: '',
  };
};
</script>
