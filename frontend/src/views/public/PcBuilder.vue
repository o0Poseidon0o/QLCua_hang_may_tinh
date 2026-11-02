<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
    <!-- 1. HERO BANNER STUDIO + 4 PRESET CHỌN NHANH -->
    <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#062415] via-[#014f2b] to-[#00733c] text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30">
      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
            <span>⚡ NHÂN PHÚC PC STUDIO 2026</span>
            <span>•</span>
            <span>AI Hardware Compatibility Check</span>
          </div>
          <h1 class="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            XÂY DỰNG CẤU HÌNH PC & ĐO HIỆU NĂNG THỰC TẾ
          </h1>
          <p class="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Tự động khóa lệch chân cắm Socket, kiểm tra khe RAM DDR4/DDR5, đo công suất nguồn thực tế và dự phóng mức FPS trong các tựa game eSports & AAA.
          </p>
        </div>

        <!-- 3 Nút công cụ nhanh -->
        <div class="flex flex-wrap items-center gap-2.5">
          <button
            @click="resetConfiguration"
            class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <el-icon><Refresh /></el-icon> Làm Mới
          </button>
          <button
            @click="printQuote"
            class="px-4 py-2.5 rounded-xl bg-white text-[#014f2b] hover:bg-emerald-50 text-xs font-extrabold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <el-icon><Printer /></el-icon> Xuất Báo Giá
          </button>
        </div>
      </div>

      <!-- Thanh Preset Cấu Hình Gợi Ý 1 Chạm -->
      <div class="relative z-10 mt-6 pt-5 border-t border-white/15">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            🚀 Nạp nhanh cấu hình mẫu chuẩn tương thích 100%:
          </span>
          <span class="text-[11px] text-emerald-200/70 hidden sm:inline">
            Nhấn vào cấu hình bất kỳ để nạp sẵn linh kiện
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            v-for="preset in presetBuilds"
            :key="preset.id"
            type="button"
            @click="applyPreset(preset)"
            class="text-left p-3.5 rounded-2xl transition-all duration-200 cursor-pointer border group"
            :class="
              activePresetId === preset.id
                ? 'bg-white text-slate-900 border-amber-400 shadow-lg scale-[1.01]'
                : 'bg-black/25 hover:bg-black/40 text-white border-white/15 hover:border-emerald-400/60'
            "
          >
            <div class="flex items-center justify-between mb-1.5">
              <span
                class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                :class="
                  activePresetId === preset.id
                    ? 'bg-[#00733c] text-white'
                    : 'bg-emerald-400/20 text-emerald-300'
                "
              >
                {{ preset.badge }}
              </span>
              <span
                class="text-[11px] font-bold"
                :class="activePresetId === preset.id ? 'text-[#00733c]' : 'text-amber-300'"
              >
                {{ preset.priceLabel }}
              </span>
            </div>
            <div
              class="font-extrabold text-xs sm:text-sm line-clamp-1"
              :class="activePresetId === preset.id ? 'text-[#014f2b]' : 'text-white'"
            >
              {{ preset.name }}
            </div>
            <div
              class="text-[11px] mt-0.5 line-clamp-1"
              :class="activePresetId === preset.id ? 'text-slate-500' : 'text-emerald-100/70'"
            >
              {{ preset.summary }}
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. BỐ CỤC STUDIO 2 CỘT: CỘT TRÁI CHỌN LINH KIỆN THEO NHÓM (8 COL) + CỘT PHẢI SƠ ĐỒ THÙNG MÁY & ĐO FPS (4 COL) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- CỘT TRÁI (8 CỘT): CÁC NHÓM LINH KIỆN -->
      <div class="lg:col-span-8 space-y-6">
        <div
          v-for="group in partGroups"
          :key="group.id"
          class="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80 space-y-4"
        >
          <!-- Tiêu đề Nhóm Linh Kiện -->
          <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <span class="w-9 h-9 rounded-xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-lg font-bold">
                {{ group.icon }}
              </span>
              <div>
                <h2 class="text-base font-extrabold text-slate-800">{{ group.title }}</h2>
                <p class="text-xs text-slate-400">{{ group.subtitle }}</p>
              </div>
            </div>

            <!-- Liên kết kỹ thuật hiển thị nhanh trong nhóm -->
            <div v-if="group.id === 'core' && (selectedMap.cpu || selectedMap.mainboard)" class="flex items-center gap-1.5">
              <span
                v-if="selectedMap.cpu || selectedMap.mainboard"
                class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#00733c] border border-emerald-200"
              >
                Socket: {{ (selectedMap.cpu || selectedMap.mainboard).socket }}
              </span>
              <span
                v-if="selectedMap.mainboard || selectedMap.ram"
                class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
              >
                Chuẩn RAM: {{ (selectedMap.mainboard || selectedMap.ram).ramType }}
              </span>
            </div>
          </div>

          <!-- Danh sách các khe linh kiện thuộc Nhóm -->
          <div class="space-y-3">
            <div
              v-for="part in getPartsByGroup(group.categories)"
              :key="part.category"
              class="rounded-2xl p-4 border transition-all duration-200"
              :class="
                hasPartError(part.category)
                  ? 'border-red-300 bg-red-50/30'
                  : part.selected
                  ? 'border-emerald-500/40 bg-emerald-50/15 shadow-xs'
                  : 'border-slate-200/80 hover:border-emerald-500/50 bg-slate-50/40'
              "
            >
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <!-- Cột Nhãn Loại Linh Kiện -->
                <div class="flex items-center gap-3 w-full sm:w-52 flex-shrink-0">
                  <div
                    class="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition"
                    :class="
                      hasPartError(part.category)
                        ? 'bg-red-100 text-red-600'
                        : part.selected
                        ? 'bg-[#00733c] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600'
                    "
                  >
                    {{ part.icon }}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm font-extrabold text-slate-800">{{ part.title }}</span>
                      <span
                        v-if="part.required"
                        class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800"
                      >
                        Cốt lõi
                      </span>
                    </div>
                    <div
                      v-if="getPartHint(part.category)"
                      class="text-[11px] font-semibold text-[#00733c] mt-0.5 truncate"
                      :title="getPartHint(part.category)"
                    >
                      {{ getPartHint(part.category) }}
                    </div>
                    <div v-else class="text-[11px] text-slate-400 mt-0.5">
                      {{ part.selected ? 'Đã lắp vào cấu hình' : 'Chưa chọn linh kiện' }}
                    </div>
                  </div>
                </div>

                <!-- Nội dung khi ĐÃ CHỌN linh kiện -->
                <div v-if="part.selected" class="flex-1 w-full min-w-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80">
                  <div class="flex items-center gap-3 min-w-0">
                    <img
                      :src="part.selected.image"
                      :alt="part.selected.name"
                      class="w-13 h-13 object-contain bg-white rounded-lg border border-slate-100 p-1 flex-shrink-0"
                    />
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-[#00733c]">
                          {{ part.selected.brand }}
                        </span>
                        <span class="text-[10px] text-slate-400 font-mono">SKU: {{ part.selected.sku }}</span>
                      </div>
                      <h4 class="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 mt-0.5" :title="part.selected.name">
                        {{ part.selected.name }}
                      </h4>
                      <div class="flex flex-wrap items-center gap-1.5 mt-1">
                        <span
                          v-for="(badge, bIdx) in getSpecBadges(part.category, part.selected)"
                          :key="bIdx"
                          class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {{ badge }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                    <div class="text-right">
                      <div class="text-sm sm:text-base font-black text-red-600">
                        {{ formatPrice(part.selected.price) }}
                      </div>
                      <div class="text-[10px] text-emerald-600 font-semibold">BH 36 Tháng</div>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button
                        @click="openSelectModal(part)"
                        class="px-3 py-1.5 text-xs font-bold text-[#00733c] bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition cursor-pointer"
                      >
                        Đổi
                      </button>
                      <button
                        @click="removePart(part)"
                        class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Tháo linh kiện"
                      >
                        <el-icon><Delete /></el-icon>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Nội dung khi CHƯA CHỌN linh kiện -->
                <div
                  v-else
                  class="flex-1 w-full flex items-center justify-between bg-white/80 border border-dashed border-slate-300 px-4 py-3 rounded-xl"
                >
                  <div class="text-xs text-slate-500">
                    <span v-if="getPartHint(part.category)" class="font-semibold text-slate-700">
                      💡 {{ getPartHint(part.category) }}
                    </span>
                    <span v-else>
                      Chọn {{ part.title.toLowerCase() }} phù hợp với nhu cầu của bạn
                    </span>
                  </div>
                  <button
                    @click="openSelectModal(part)"
                    class="px-4 py-2 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-extrabold rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <el-icon><Plus /></el-icon>
                    <span>Chọn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CỘT PHẢI (4 CỘT STICKY): SƠ ĐỒ THÙNG MÁY TRỰC QUAN + ĐỒNG HỒ CÔNG SUẤT + ĐO FPS GAME + TỔNG KẾT -->
      <div class="lg:col-span-4 lg:sticky lg:top-20 space-y-5">
        <!-- A. SƠ ĐỒ MÔ PHỎNG THÙNG MÁY (INTERACTIVE PC BLUEPRINT) -->
        <div class="bg-[#081c12] text-white rounded-3xl p-5 shadow-xl border border-emerald-500/30 space-y-4">
          <div class="flex items-center justify-between border-b border-emerald-800/60 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 class="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                Sơ Đồ Thùng Máy & Tương Thích
              </h3>
            </div>
            <span class="text-xs font-bold text-slate-300">
              Đã lắp {{ selectedCount }}/{{ parts.length }}
            </span>
          </div>

          <!-- Sơ đồ trực quan Bo mạch & Linh kiện trong Case -->
          <div class="bg-[#0d281a] rounded-2xl p-3.5 border border-emerald-700/40 space-y-2.5">
            <!-- Hàng 1: Vỏ Case & Tản nhiệt -->
            <div class="grid grid-cols-2 gap-2">
              <div
                @click="openByCategory('case')"
                class="p-2.5 rounded-xl border text-xs cursor-pointer transition"
                :class="getSlotBoxClass('case')"
              >
                <div class="flex items-center justify-between text-[10px] opacity-75">
                  <span>🏢 VỎ CASE</span>
                  <span>{{ selectedMap.case ? 'Đã lắp' : 'Trống' }}</span>
                </div>
                <div class="font-bold truncate mt-0.5">
                  {{ selectedMap.case ? selectedMap.case.brand + ' (' + selectedMap.case.supportedFormFactors[0] + ')' : '+ Chọn Case' }}
                </div>
              </div>

              <div
                @click="openByCategory('cooler')"
                class="p-2.5 rounded-xl border text-xs cursor-pointer transition"
                :class="getSlotBoxClass('cooler')"
              >
                <div class="flex items-center justify-between text-[10px] opacity-75">
                  <span>❄️ TẢN NHIỆT</span>
                  <span>{{ selectedMap.cooler ? selectedMap.cooler.maxTdp + 'W' : 'Trống' }}</span>
                </div>
                <div class="font-bold truncate mt-0.5">
                  {{ selectedMap.cooler ? selectedMap.cooler.type : '+ Chọn Tản' }}
                </div>
              </div>
            </div>

            <!-- Khung Bo Mạch Chủ (Motherboard Tray) -->
            <div class="p-3 rounded-xl border border-dashed border-emerald-500/40 bg-[#071910] space-y-2">
              <div
                @click="openByCategory('mainboard')"
                class="flex items-center justify-between text-xs cursor-pointer hover:text-emerald-300"
              >
                <span class="font-extrabold text-emerald-300">
                  🎛️ {{ selectedMap.mainboard ? `${selectedMap.mainboard.brand} ${selectedMap.mainboard.chipset} (${selectedMap.mainboard.formFactor})` : 'BO MẠCH CHỦ (Chưa lắp)' }}
                </span>
                <span v-if="selectedMap.mainboard" class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  {{ selectedMap.mainboard.socket }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <!-- CPU Socket -->
                <div
                  @click="openByCategory('cpu')"
                  class="p-2.5 rounded-lg border text-xs cursor-pointer transition"
                  :class="getSlotBoxClass('cpu')"
                >
                  <div class="text-[10px] opacity-75">⚡ CPU SOCKET</div>
                  <div class="font-bold truncate mt-0.5">
                    {{ selectedMap.cpu ? selectedMap.cpu.socket : '+ Lắp CPU' }}
                  </div>
                </div>

                <!-- RAM Slots -->
                <div
                  @click="openByCategory('ram')"
                  class="p-2.5 rounded-lg border text-xs cursor-pointer transition"
                  :class="getSlotBoxClass('ram')"
                >
                  <div class="text-[10px] opacity-75">💾 KHE RAM</div>
                  <div class="font-bold truncate mt-0.5">
                    {{ selectedMap.ram ? `${selectedMap.ram.capacityGb}GB ${selectedMap.ram.ramType}` : '+ Lắp RAM' }}
                  </div>
                </div>
              </div>

              <!-- PCIe x16 VGA & M.2 NVMe -->
              <div class="grid grid-cols-3 gap-2">
                <div
                  @click="openByCategory('vga')"
                  class="col-span-2 p-2.5 rounded-lg border text-xs cursor-pointer transition"
                  :class="getSlotBoxClass('vga')"
                >
                  <div class="text-[10px] opacity-75">🎮 KHE PCIe x16 (VGA)</div>
                  <div class="font-bold truncate mt-0.5">
                    {{ selectedMap.vga ? selectedMap.vga.name.replace('Card Màn Hình ', '') : '+ Lắp Card Đồ Họa' }}
                  </div>
                </div>

                <div
                  @click="openByCategory('ssd')"
                  class="col-span-1 p-2.5 rounded-lg border text-xs cursor-pointer transition"
                  :class="getSlotBoxClass('ssd')"
                >
                  <div class="text-[10px] opacity-75">💽 M.2</div>
                  <div class="font-bold truncate mt-0.5">
                    {{ selectedMap.ssd ? selectedMap.ssd.capacity : '+ SSD' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Hàng dưới: Nguồn PSU & Đồng hồ Watt -->
            <div
              @click="openByCategory('psu')"
              class="p-3 rounded-xl border text-xs cursor-pointer transition"
              :class="getSlotBoxClass('psu')"
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-bold">
                  🔌 {{ selectedMap.psu ? `${selectedMap.psu.brand} ${selectedMap.psu.wattage}W` : 'NGUỒN PSU (Chưa chọn)' }}
                </span>
                <span class="text-[11px] font-mono text-amber-300">
                  Tiêu thụ: {{ estimatedWattage }}W / KN ≥ {{ recommendedPsuWattage }}W
                </span>
              </div>
              <!-- Thanh tiến trình công suất -->
              <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-300 rounded-full"
                  :class="
                    selectedMap.psu && selectedMap.psu.wattage < recommendedPsuWattage
                      ? 'bg-red-500'
                      : 'bg-gradient-to-r from-emerald-400 to-amber-400'
                  "
                  :style="{ width: `${Math.min(100, Math.round((estimatedWattage / (selectedMap.psu?.wattage || recommendedPsuWattage)) * 100))}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- 5 Tiêu chí Kiểm tra Tương thích thu gọn -->
          <div class="space-y-1.5">
            <div
              v-for="check in compatibilityChecklist"
              :key="check.id"
              class="px-3 py-2 rounded-xl text-xs flex items-center justify-between border"
              :class="
                check.status === 'ok'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                  : check.status === 'error'
                  ? 'bg-red-500/20 border-red-400/50 text-red-200'
                  : check.status === 'warn'
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                  : 'bg-white/5 border-white/10 text-slate-400'
              "
            >
              <span class="font-bold">{{ check.title }}</span>
              <span class="text-[11px] text-right truncate max-w-[180px]" :title="check.detail">
                {{ check.status === 'ok' ? '✅ ' : check.status === 'error' ? '❌ ' : check.status === 'warn' ? '⚠️ ' : '⏳ ' }}
                {{ check.detail }}
              </span>
            </div>
          </div>

          <!-- Cảnh báo chi tiết nếu có lỗi -->
          <div v-if="compatibilityIssues.length > 0" class="space-y-2 pt-1">
            <div
              v-for="(issue, idx) in compatibilityIssues"
              :key="idx"
              class="p-3 rounded-xl border text-xs leading-relaxed"
              :class="
                issue.severity === 'error'
                  ? 'bg-red-950/80 border-red-500/60 text-red-200'
                  : 'bg-amber-950/80 border-amber-500/60 text-amber-200'
              "
            >
              <div class="font-extrabold">
                {{ issue.severity === 'error' ? '❌' : '⚠️' }} {{ issue.title }}
              </div>
              <div class="text-[11px] opacity-90 mt-0.5">{{ issue.message }}</div>
            </div>
          </div>
        </div>

        <!-- B. ĐO HIỆU NĂNG GAME & ĐỒ HỌA DỰ KIẾN (ESTIMATED FPS) -->
        <div class="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <span>🎯 Ước tính Hiệu năng Game (Full HD)</span>
            </div>
            <span class="text-[11px] font-bold text-[#00733c] bg-emerald-50 px-2 py-0.5 rounded-full">
              {{ performanceMetrics.tierLabel }}
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center">
            <div
              v-for="game in performanceMetrics.games"
              :key="game.name"
              class="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70"
            >
              <div class="text-[11px] font-bold text-slate-600 truncate">{{ game.name }}</div>
              <div class="text-base font-black text-[#00733c] mt-0.5">{{ game.fps }}</div>
              <div class="text-[10px] text-slate-400">{{ game.setting }}</div>
            </div>
          </div>
        </div>

        <!-- C. TỔNG TIỀN & ĐẶT MUA -->
        <div class="bg-white rounded-3xl p-5 shadow-lg border-2 border-[#00733c] space-y-4">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-bold uppercase text-slate-500">Tổng chi phí tạm tính:</span>
            <span class="text-2xl font-black text-red-600">{{ formatPrice(totalBuildPrice) }}</span>
          </div>

          <div class="text-xs text-slate-500 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60 space-y-1">
            <div class="font-bold text-[#014f2b]">🎁 Đặc quyền Build PC tại Nhân Phúc Tech:</div>
            <div>• Miễn phí lắp ráp đi dây thẩm mỹ & cài đặt Windows</div>
            <div>• Hỗ trợ trả góp 0% (Chỉ từ {{ formatPrice(Math.round(totalBuildPrice / 12)) }}/tháng)</div>
          </div>

          <button
            @click="addAllToCart"
            class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00733c] to-[#014f2b] hover:from-emerald-600 hover:to-emerald-800 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <el-icon :size="18"><ShoppingCart /></el-icon>
            <span>Thêm Cả Dàn PC Vào Giỏ Hàng</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Component Picker with Smart Compatibility Filter -->
    <el-dialog
      v-model="isModalOpen"
      :title="`Chọn ${activePart?.title || 'Linh Kiện'}`"
      width="820px"
      destroy-on-close
    >
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <el-input
            v-model="modalSearch"
            placeholder="Tìm theo tên linh kiện, socket, DDR4/DDR5, mã SKU..."
            clearable
            class="flex-1"
          />
          <div class="flex items-center gap-2">
            <el-switch
              v-model="onlyShowCompatible"
              active-color="#00733c"
              active-text="Chỉ hiện linh kiện tương thích"
            />
          </div>
        </div>

        <div
          v-if="activePart && getPartHint(activePart.category)"
          class="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between"
        >
          <span>
            💡 <strong>Gợi ý kỹ thuật:</strong> {{ getPartHint(activePart.category) }}
          </span>
          <span v-if="onlyShowCompatible" class="text-[11px] text-emerald-600 font-semibold">
            Đang lọc tự động
          </span>
        </div>

        <div class="max-h-[440px] overflow-y-auto space-y-2.5 pr-1">
          <div
            v-if="filteredModalProducts.length === 0"
            class="text-center py-10 text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200"
          >
            <p class="font-bold text-slate-700 mb-1">Không tìm thấy linh kiện phù hợp với bộ lọc hiện tại.</p>
            <p class="text-xs text-slate-400 mb-3">
              Bạn có thể tắt chế độ "Chỉ hiện linh kiện tương thích" để xem toàn bộ kho hàng.
            </p>
            <el-button size="small" @click="onlyShowCompatible = false">
              Xem tất cả linh kiện
            </el-button>
          </div>

          <div
            v-for="item in filteredModalProducts"
            :key="item.id"
            class="p-3 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            :class="
              checkCandidateCompatibility(activePart?.category, item).compatible
                ? 'bg-white border-slate-200 hover:border-[#00733c]'
                : 'bg-red-50/40 border-red-200 opacity-85'
            "
          >
            <div class="flex items-center gap-3 min-w-0">
              <img :src="item.image" :alt="item.name" class="w-14 h-14 object-contain bg-white rounded border p-1 flex-shrink-0" />
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {{ item.brand }}
                  </span>
                  <span
                    v-if="checkCandidateCompatibility(activePart?.category, item).compatible"
                    class="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full"
                  >
                    ✅ Tương thích
                  </span>
                  <span
                    v-else
                    class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full"
                  >
                    ⚠️ {{ checkCandidateCompatibility(activePart?.category, item).reason }}
                  </span>
                </div>

                <h4 class="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {{ item.name }}
                </h4>

                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span
                    v-for="(badge, bIdx) in getSpecBadges(activePart?.category, item)"
                    :key="bIdx"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                  >
                    {{ badge }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
              <div class="text-right">
                <div class="text-sm font-extrabold text-red-600">{{ formatPrice(item.price) }}</div>
                <div v-if="item.originalPrice" class="text-[11px] text-slate-400 line-through">
                  {{ formatPrice(item.originalPrice) }}
                </div>
              </div>
              <button
                @click="confirmSelectPart(item)"
                class="px-4 py-2 font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
                :class="
                  checkCandidateCompatibility(activePart?.category, item).compatible
                    ? 'bg-[#00733c] hover:bg-[#014f2b] text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                "
              >
                {{ checkCandidateCompatibility(activePart?.category, item).compatible ? 'Chọn' : 'Vẫn chọn' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Refresh, Printer, ShoppingCart, Delete, Plus } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore();

// Phân nhóm linh kiện trực quan
const partGroups = [
  {
    id: 'core',
    title: '1. Nền tảng Vi xử lý & Bo mạch (Core Platform)',
    subtitle: 'CPU, Mainboard, RAM & Tản nhiệt — Tự động đồng bộ chân cắm Socket và thế hệ RAM',
    icon: '🧠',
    categories: ['cpu', 'mainboard', 'ram', 'cooler'],
  },
  {
    id: 'graphics',
    title: '2. Xử lý Đồ họa & Lưu trữ tốc độ cao',
    subtitle: 'Card màn hình VGA & Ổ cứng SSD NVMe quyết định tốc độ khung hình FPS và thời gian khởi động',
    icon: '🎮',
    categories: ['vga', 'ssd'],
  },
  {
    id: 'power',
    title: '3. Nguồn cấp điện & Thùng máy (Power & Chassis)',
    subtitle: 'Đảm bảo đủ công suất Watt và không gian lắp đặt chuẩn ATX / mATX',
    icon: '🔌',
    categories: ['psu', 'case'],
  },
  {
    id: 'peripherals',
    title: '4. Màn hình & Gaming Gear đi kèm',
    subtitle: 'Hoàn thiện góc máy chiến game và làm việc chuyên nghiệp',
    icon: '🖥️',
    categories: ['monitor', 'gear'],
  },
];

// Danh sách 10 hạng mục linh kiện PC
const parts = ref<any[]>([
  { category: 'cpu', title: 'Bộ Vi Xử Lý (CPU)', icon: '⚡', required: true, selected: null },
  { category: 'mainboard', title: 'Bo Mạch Chủ (Mainboard)', icon: '🎛️', required: true, selected: null },
  { category: 'ram', title: 'Bộ Nhớ Trong (RAM)', icon: '💾', required: true, selected: null },
  { category: 'cooler', title: 'Tản Nhiệt CPU (Cooler)', icon: '❄️', required: false, selected: null },
  { category: 'vga', title: 'Card Màn Hình (VGA)', icon: '🎮', required: false, selected: null },
  { category: 'ssd', title: 'Ổ Cứng SSD / HDD', icon: '💽', required: true, selected: null },
  { category: 'psu', title: 'Nguồn Máy Tính (PSU)', icon: '🔌', required: true, selected: null },
  { category: 'case', title: 'Vỏ Máy Tính (Case)', icon: '🏢', required: true, selected: null },
  { category: 'monitor', title: 'Màn Hình Máy Tính', icon: '📺', required: false, selected: null },
  { category: 'gear', title: 'Phím Chuột Gaming', icon: '⌨️', required: false, selected: null },
]);

const getPartsByGroup = (cats: string[]) => {
  return parts.value.filter((p) => cats.includes(p.category));
};

// Kho dữ liệu linh kiện kèm đầy đủ thông số kỹ thuật
const mockComponentsDatabase: Record<string, any[]> = {
  cpu: [
    {
      id: 'c-1',
      name: 'Intel Core i5-13400F (Up to 4.6GHz, 10 Nhân 16 Luồng, 20MB Cache)',
      sku: 'CPU-INTEL-13400F',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 65,
      tier: 'mid',
      perfScore: 75,
      price: 4390000,
      originalPrice: 5200000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-2',
      name: 'Intel Core i7-14700K (Up to 5.6GHz, 20 Nhân 28 Luồng, 33MB Cache)',
      sku: 'CPU-INTEL-14700K',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 253,
      tier: 'high',
      perfScore: 95,
      price: 10490000,
      originalPrice: 11990000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-3',
      name: 'AMD Ryzen 5 7600 (Up to 5.1GHz, 6 Nhân 12 Luồng, 38MB Cache, AM5)',
      sku: 'CPU-AMD-7600',
      brand: 'AMD',
      socket: 'AM5',
      supportedRam: ['DDR5'],
      tdp: 65,
      tier: 'mid',
      perfScore: 80,
      price: 4990000,
      originalPrice: 5790000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-4',
      name: 'Intel Core i3-12100F (Up to 4.3GHz, 4 Nhân 8 Luồng, 12MB Cache)',
      sku: 'CPU-INTEL-12100F',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 58,
      tier: 'entry',
      perfScore: 55,
      price: 2190000,
      originalPrice: 2690000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-5',
      name: 'AMD Ryzen 5 5600X (Up to 4.6GHz, 6 Nhân 12 Luồng, 35MB Cache, AM4)',
      sku: 'CPU-AMD-5600X',
      brand: 'AMD',
      socket: 'AM4',
      supportedRam: ['DDR4'],
      tdp: 65,
      tier: 'entry',
      perfScore: 68,
      price: 3290000,
      originalPrice: 3890000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-6',
      name: 'AMD Ryzen 7 7800X3D (Up to 5.0GHz, 8 Nhân 16 Luồng, 96MB 3D V-Cache, AM5)',
      sku: 'CPU-AMD-7800X3D',
      brand: 'AMD',
      socket: 'AM5',
      supportedRam: ['DDR5'],
      tdp: 120,
      tier: 'high',
      perfScore: 98,
      price: 10990000,
      originalPrice: 12490000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
  ],
  mainboard: [
    {
      id: 'm-1',
      name: 'Mainboard ASUS TUF GAMING B760M-PLUS WIFI DDR5 (LGA1700 / mATX)',
      sku: 'MB-ASUS-B760M-D5',
      brand: 'ASUS',
      socket: 'LGA1700',
      chipset: 'B760',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 3890000,
      originalPrice: 4390000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-2',
      name: 'Mainboard MSI MAG B650 TOMAHAWK WIFI DDR5 (AMD AM5 / ATX)',
      sku: 'MB-MSI-B650',
      brand: 'MSI',
      socket: 'AM5',
      chipset: 'B650',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'ATX',
      vrmTier: 'high',
      price: 5490000,
      originalPrice: 5990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-3',
      name: 'Mainboard Gigabyte H610M H V2 DDR4 (LGA1700 / mATX)',
      sku: 'MB-GIGA-H610-D4',
      brand: 'Gigabyte',
      socket: 'LGA1700',
      chipset: 'H610',
      ramType: 'DDR4',
      ramSlots: 2,
      maxRamGb: 64,
      formFactor: 'mATX',
      vrmTier: 'entry',
      price: 1790000,
      originalPrice: 2090000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-4',
      name: 'Mainboard ASUS ROG STRIX Z790-F GAMING WIFI II DDR5 (LGA1700 / ATX)',
      sku: 'MB-ASUS-Z790-D5',
      brand: 'ASUS',
      socket: 'LGA1700',
      chipset: 'Z790',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'ATX',
      vrmTier: 'high',
      price: 9490000,
      originalPrice: 10990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-5',
      name: 'Mainboard MSI B550M PRO-VDH WIFI DDR4 (AMD AM4 / mATX)',
      sku: 'MB-MSI-B550M-D4',
      brand: 'MSI',
      socket: 'AM4',
      chipset: 'B550',
      ramType: 'DDR4',
      ramSlots: 4,
      maxRamGb: 128,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 2590000,
      originalPrice: 2990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-6',
      name: 'Mainboard ASRock B650M Pro RS DDR5 (AMD AM5 / mATX)',
      sku: 'MB-ASR-B650M-D5',
      brand: 'ASRock',
      socket: 'AM5',
      chipset: 'B650',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 3690000,
      originalPrice: 4190000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
  ],
  ram: [
    {
      id: 'r-1',
      name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz',
      sku: 'RAM-KING-16-D4',
      brand: 'Kingston',
      ramType: 'DDR4',
      speed: '3200MHz',
      capacityGb: 16,
      modules: 2,
      price: 1090000,
      originalPrice: 1490000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-2',
      name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL36',
      sku: 'RAM-COR-32-D5',
      brand: 'Corsair',
      ramType: 'DDR5',
      speed: '6000MHz',
      capacityGb: 32,
      modules: 2,
      price: 2990000,
      originalPrice: 3590000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-3',
      name: 'RAM G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz',
      sku: 'RAM-GSK-64-D5',
      brand: 'G.Skill',
      ramType: 'DDR5',
      speed: '6400MHz',
      capacityGb: 64,
      modules: 2,
      price: 5690000,
      originalPrice: 6290000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-4',
      name: 'RAM Corsair Vengeance LPX 32GB (2x16GB) DDR4 3600MHz',
      sku: 'RAM-COR-32-D4',
      brand: 'Corsair',
      ramType: 'DDR4',
      speed: '3600MHz',
      capacityGb: 32,
      modules: 2,
      price: 1890000,
      originalPrice: 2290000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
  ],
  vga: [
    {
      id: 'v-1',
      name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB GDDR6',
      sku: 'VGA-ASUS-4060',
      brand: 'ASUS',
      tdp: 115,
      recommendedPsu: 550,
      lengthMm: 227,
      perfScore: 78,
      price: 8490000,
      originalPrice: 9990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-2',
      name: 'Card Màn Hình MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC',
      sku: 'VGA-MSI-4070S',
      brand: 'MSI',
      tdp: 220,
      recommendedPsu: 650,
      lengthMm: 242,
      perfScore: 92,
      price: 16990000,
      originalPrice: 18990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-3',
      name: 'Card Màn Hình Gigabyte GeForce GTX 1650 D6 OC 4G',
      sku: 'VGA-GIGA-1650',
      brand: 'Gigabyte',
      tdp: 75,
      recommendedPsu: 450,
      lengthMm: 172,
      perfScore: 52,
      price: 3490000,
      originalPrice: 3990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-4',
      name: 'Card Màn Hình ASUS ROG Strix GeForce RTX 4080 SUPER 16GB OC (3 Fan)',
      sku: 'VGA-ROG-4080S',
      brand: 'ASUS',
      tdp: 320,
      recommendedPsu: 850,
      lengthMm: 357,
      perfScore: 99,
      price: 31990000,
      originalPrice: 34990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
  ],
  ssd: [
    {
      id: 's-1',
      name: 'Ổ Cứng SSD Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2',
      sku: 'SSD-KING-1TB',
      brand: 'Kingston',
      interface: 'M.2 NVMe PCIe 4.0',
      capacity: '1TB NVMe',
      price: 1590000,
      originalPrice: 1890000,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80',
    },
    {
      id: 's-2',
      name: 'Ổ Cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe M.2 (7450MB/s)',
      sku: 'SSD-SAM-990-1T',
      brand: 'Samsung',
      interface: 'M.2 NVMe PCIe 4.0',
      capacity: '1TB PRO',
      price: 2790000,
      originalPrice: 3200000,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80',
    },
  ],
  psu: [
    {
      id: 'p-1',
      name: 'Nguồn Máy Tính Corsair CV650 650W 80 Plus Bronze',
      sku: 'PSU-COR-CV650',
      brand: 'Corsair',
      wattage: 650,
      efficiency: '80 Plus Bronze',
      price: 1390000,
      originalPrice: 1690000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-2',
      name: 'Nguồn Máy Tính ASUS TUF Gaming 750W 80 Plus Bronze PCIe 5.0',
      sku: 'PSU-ASUS-750W',
      brand: 'ASUS',
      wattage: 750,
      efficiency: '80 Plus Bronze',
      price: 1890000,
      originalPrice: 2290000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-3',
      name: 'Nguồn Máy Tính Corsair RM850e 850W 80 Plus Gold Full Modular ATX 3.0',
      sku: 'PSU-COR-RM850E',
      brand: 'Corsair',
      wattage: 850,
      efficiency: '80 Plus Gold',
      price: 3190000,
      originalPrice: 3590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-4',
      name: 'Nguồn Máy Tính Deepcool PF550 550W 80 Plus Standard',
      sku: 'PSU-DEEP-550W',
      brand: 'Deepcool',
      wattage: 550,
      efficiency: '80 Plus',
      price: 890000,
      originalPrice: 1090000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  case: [
    {
      id: 'cs-1',
      name: 'Vỏ Case Xigmatek Aqua M Lite 3FX (Mini Tower mATX - Kèm 3 Fan RGB)',
      sku: 'CASE-XIG-AQUA',
      brand: 'Xigmatek',
      supportedFormFactors: ['mATX', 'Mini-ITX'],
      maxGpuLengthMm: 320,
      price: 890000,
      originalPrice: 1100000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cs-2',
      name: 'Vỏ Case NZXT H5 Flow Black (Mid Tower ATX / mATX - Kính Cường Lực)',
      sku: 'CASE-NZXT-H5',
      brand: 'NZXT',
      supportedFormFactors: ['ATX', 'mATX', 'Mini-ITX'],
      maxGpuLengthMm: 365,
      price: 2190000,
      originalPrice: 2590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  cooler: [
    {
      id: 'cl-1',
      name: 'Tản Nhiệt Khí Thermalright Peerless Assassin 120 SE ARGB (Hỗ trợ 220W)',
      sku: 'COOL-TR-PA120',
      brand: 'Thermalright',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 220,
      type: 'Tản khí Tháp đôi',
      price: 850000,
      originalPrice: 1050000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cl-2',
      name: 'Tản Nhiệt Nước AIO Deepcool LT520 240mm ARGB (Hỗ trợ 280W)',
      sku: 'COOL-DEEP-LT520',
      brand: 'Deepcool',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 280,
      type: 'AIO 240mm',
      price: 1990000,
      originalPrice: 2490000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cl-3',
      name: 'Tản Nhiệt Khí ID-COOLING SE-214-XT ARGB (Hỗ trợ 150W)',
      sku: 'COOL-IDC-214XT',
      brand: 'ID-Cooling',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 150,
      type: 'Tản khí Đơn',
      price: 450000,
      originalPrice: 590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  monitor: [
    {
      id: 'mo-1',
      name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms',
      sku: 'MON-ASUS-24-180',
      brand: 'ASUS',
      panel: '24" Fast IPS 180Hz',
      price: 3190000,
      originalPrice: 4290000,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&q=80',
    },
  ],
  gear: [
    {
      id: 'g-1',
      name: 'Bộ Bàn Phím Cơ + Chuột Gaming DareU RGB Chính Hãng',
      sku: 'GEAR-DAREU-COMBO',
      brand: 'DareU',
      price: 790000,
      originalPrice: 1100000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
};

const selectedMap = computed(() => {
  const map: Record<string, any> = {};
  for (const p of parts.value) {
    map[p.category] = p.selected;
  }
  return map;
});

const estimatedWattage = computed(() => {
  const cpuW = selectedMap.value.cpu?.tdp || 0;
  const vgaW = selectedMap.value.vga?.tdp || 0;
  const baseW = selectedCount.value > 0 ? 75 : 0;
  return cpuW + vgaW + baseW;
});

const recommendedPsuWattage = computed(() => {
  const raw = Math.ceil((estimatedWattage.value * 1.25) / 50) * 50;
  const vgaMin = selectedMap.value.vga?.recommendedPsu || 0;
  return Math.max(raw, vgaMin, 450);
});

// Tính toán điểm FPS dự kiến cho các tựa game
const performanceMetrics = computed(() => {
  const { cpu, vga } = selectedMap.value;
  if (!cpu && !vga) {
    return {
      tierLabel: 'Chưa chọn CPU / VGA',
      games: [
        { name: 'Valorant / CS2', fps: '-- FPS', setting: '1080p High' },
        { name: 'GTA V / FO4', fps: '-- FPS', setting: '1080p High' },
        { name: 'Black Myth / AAA', fps: '-- FPS', setting: '1080p Ultra' },
      ],
    };
  }
  const cScore = cpu?.perfScore || 60;
  const gScore = vga?.perfScore || 35;
  const combined = Math.round(cScore * 0.35 + gScore * 0.65);

  if (combined >= 88) {
    return {
      tierLabel: 'Chiến Mượt 2K / 4K Ultra',
      games: [
        { name: 'Valorant / CS2', fps: '360+ FPS', setting: 'Max Settings' },
        { name: 'PUBG / Apex', fps: '185+ FPS', setting: '2K Ultra' },
        { name: 'Black Myth AAA', fps: '110+ FPS', setting: '2K High + DLSS' },
      ],
    };
  }
  if (combined >= 70) {
    return {
      tierLabel: 'Chuẩn eSports & AAA 1080p',
      games: [
        { name: 'Valorant / CS2', fps: '240+ FPS', setting: '1080p High' },
        { name: 'PUBG / GTA V', fps: '130+ FPS', setting: '1080p Ultra' },
        { name: 'Black Myth AAA', fps: '75+ FPS', setting: '1080p High' },
      ],
    };
  }
  return {
    tierLabel: 'Phổ Thông & eSports',
    games: [
      { name: 'Valorant / LOL', fps: '144+ FPS', setting: '1080p High' },
      { name: 'FC Online / GTA V', fps: '85+ FPS', setting: '1080p Medium' },
      { name: 'Game AAA', fps: '45+ FPS', setting: '1080p Low-Med' },
    ],
  };
});

interface CompatibilityIssue {
  severity: 'error' | 'warning';
  categories: string[];
  title: string;
  message: string;
}

const compatibilityIssues = computed<CompatibilityIssue[]>(() => {
  const issues: CompatibilityIssue[] = [];
  const { cpu, mainboard, ram, vga, psu, case: pcCase, cooler } = selectedMap.value;

  if (cpu && mainboard) {
    if (cpu.socket !== mainboard.socket) {
      issues.push({
        severity: 'error',
        categories: ['cpu', 'mainboard'],
        title: 'Xung đột Socket CPU & Mainboard',
        message: `${cpu.name} dùng chân cắm ${cpu.socket}, không thể lắp vừa ${mainboard.name} (Socket ${mainboard.socket}).`,
      });
    } else if (cpu.tier === 'high' && mainboard.vrmTier === 'entry') {
      issues.push({
        severity: 'warning',
        categories: ['cpu', 'mainboard'],
        title: 'Cảnh báo tải mạch VRM Mainboard',
        message: `${cpu.name} có công suất tỏa nhiệt cao (${cpu.tdp}W), nên ghép với Mainboard dòng B760/Z790 hoặc B650 thay vì dòng phổ thông ${mainboard.chipset}.`,
      });
    }
  }

  if (mainboard && ram) {
    if (mainboard.ramType !== ram.ramType) {
      issues.push({
        severity: 'error',
        categories: ['mainboard', 'ram'],
        title: 'Xung đột chuẩn khe cắm RAM',
        message: `${mainboard.name} chỉ hỗ trợ chuẩn ${mainboard.ramType}, nhưng bạn đang chọn ${ram.name} (${ram.ramType}).`,
      });
    }
  }

  if (cpu && ram && cpu.supportedRam && !cpu.supportedRam.includes(ram.ramType)) {
    issues.push({
      severity: 'error',
      categories: ['cpu', 'ram'],
      title: 'CPU không hỗ trợ chuẩn RAM này',
      message: `${cpu.name} chỉ hỗ trợ bộ nhớ ${cpu.supportedRam.join('/')}, không tương thích với ${ram.ramType}.`,
    });
  }

  if (mainboard && pcCase) {
    if (!pcCase.supportedFormFactors.includes(mainboard.formFactor)) {
      issues.push({
        severity: 'error',
        categories: ['mainboard', 'case'],
        title: 'Vỏ Case không vừa kích thước Mainboard',
        message: `${pcCase.name} chỉ hỗ trợ Mainboard cỡ ${pcCase.supportedFormFactors.join('/')}, không lắp vừa ${mainboard.name} (chuẩn ${mainboard.formFactor}).`,
      });
    }
  }

  if (vga && pcCase) {
    if (vga.lengthMm > pcCase.maxGpuLengthMm) {
      issues.push({
        severity: 'error',
        categories: ['vga', 'case'],
        title: 'Card màn hình quá dài so với Vỏ Case',
        message: `${vga.name} dài ${vga.lengthMm}mm, vượt quá giới hạn tối đa ${pcCase.maxGpuLengthMm}mm của ${pcCase.name}.`,
      });
    }
  }

  if (psu && (cpu || vga)) {
    if (psu.wattage < recommendedPsuWattage.value) {
      issues.push({
        severity: 'error',
        categories: ['psu', 'vga', 'cpu'],
        title: 'Nguồn (PSU) không đủ công suất an toàn',
        message: `Cấu hình hiện tại cần nguồn tối thiểu ${recommendedPsuWattage.value}W, nhưng ${psu.name} chỉ có ${psu.wattage}W.`,
      });
    }
  }

  if (cpu && cooler) {
    if (cooler.maxTdp < cpu.tdp) {
      issues.push({
        severity: 'warning',
        categories: ['cpu', 'cooler'],
        title: 'Tản nhiệt CPU chưa đủ công suất giải nhiệt',
        message: `${cpu.name} tỏa nhiệt tới ${cpu.tdp}W nhưng ${cooler.name} chỉ khuyến nghị tối đa ${cooler.maxTdp}W.`,
      });
    }
  }

  return issues;
});

const compatibilityChecklist = computed(() => {
  const { cpu, mainboard, ram, vga, psu, case: pcCase, cooler } = selectedMap.value;

  let socketItem = {
    id: 'socket',
    title: 'Socket CPU & Main',
    status: 'pending',
    detail: 'Chờ chọn CPU & Main',
  };
  if (cpu && mainboard) {
    socketItem =
      cpu.socket === mainboard.socket
        ? { id: 'socket', title: 'Socket CPU & Main', status: 'ok', detail: `Khớp ${cpu.socket}` }
        : { id: 'socket', title: 'Socket CPU & Main', status: 'error', detail: `${cpu.socket} ≠ ${mainboard.socket}` };
  }

  let ramItem = {
    id: 'ram',
    title: 'Chuẩn RAM & Main',
    status: 'pending',
    detail: 'Chờ chọn Main & RAM',
  };
  if (mainboard && ram) {
    ramItem =
      mainboard.ramType === ram.ramType
        ? { id: 'ram', title: 'Chuẩn RAM & Main', status: 'ok', detail: `Khớp ${ram.ramType}` }
        : { id: 'ram', title: 'Chuẩn RAM & Main', status: 'error', detail: `${mainboard.ramType} ≠ ${ram.ramType}` };
  }

  let caseItem = {
    id: 'case',
    title: 'Kích thước Vỏ Case',
    status: 'pending',
    detail: 'Chờ chọn Case & Main',
  };
  if (pcCase && (mainboard || vga)) {
    const formOk = !mainboard || pcCase.supportedFormFactors.includes(mainboard.formFactor);
    const vgaOk = !vga || vga.lengthMm <= pcCase.maxGpuLengthMm;
    caseItem =
      formOk && vgaOk
        ? { id: 'case', title: 'Kích thước Vỏ Case', status: 'ok', detail: `Lắp vừa ${mainboard?.formFactor || 'VGA'}` }
        : { id: 'case', title: 'Kích thước Vỏ Case', status: 'error', detail: !formOk ? `Cấn Main ${mainboard.formFactor}` : 'Cấn chiều dài VGA' };
  }

  let psuItem = {
    id: 'psu',
    title: 'Công suất Nguồn',
    status: 'pending',
    detail: `Ước tính ${estimatedWattage.value}W`,
  };
  if (psu && (cpu || vga)) {
    psuItem =
      psu.wattage >= recommendedPsuWattage.value
        ? { id: 'psu', title: 'Công suất Nguồn', status: 'ok', detail: `${psu.wattage}W (Đủ tải)` }
        : { id: 'psu', title: 'Công suất Nguồn', status: 'error', detail: `${psu.wattage}W < ${recommendedPsuWattage.value}W` };
  }

  let coolerItem = {
    id: 'cooler',
    title: 'Tản nhiệt CPU',
    status: 'pending',
    detail: 'Chờ chọn CPU & Tản',
  };
  if (cpu && cooler) {
    coolerItem =
      cooler.maxTdp >= cpu.tdp
        ? { id: 'cooler', title: 'Tản nhiệt CPU', status: 'ok', detail: `${cooler.maxTdp}W ≥ ${cpu.tdp}W` }
        : { id: 'cooler', title: 'Tản nhiệt CPU', status: 'warn', detail: `Tản ${cooler.maxTdp}W hơi yếu` };
  }

  return [socketItem, ramItem, caseItem, psuItem, coolerItem];
});

const hasPartError = (category: string) => {
  return compatibilityIssues.value.some(
    (i) => i.severity === 'error' && i.categories.includes(category)
  );
};

const getSlotBoxClass = (category: string) => {
  if (hasPartError(category)) {
    return 'bg-red-500/20 border-red-400 text-red-200';
  }
  if (selectedMap.value[category]) {
    return 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200';
  }
  return 'bg-white/5 border-white/10 text-slate-400 hover:border-emerald-400/40';
};

const openByCategory = (category: string) => {
  const found = parts.value.find((p) => p.category === category);
  if (found) openSelectModal(found);
};

const getPartHint = (category: string): string => {
  const { cpu, mainboard, ram, vga, case: pcCase } = selectedMap.value;
  if (category === 'cpu' && mainboard) {
    return `Cần chọn CPU có Socket ${mainboard.socket}`;
  }
  if (category === 'mainboard') {
    const hints: string[] = [];
    if (cpu) hints.push(`Socket ${cpu.socket}`);
    if (ram) hints.push(`Hỗ trợ ${ram.ramType}`);
    if (pcCase) hints.push(`Cỡ ${pcCase.supportedFormFactors.join('/')}`);
    return hints.length ? `Cần Mainboard: ${hints.join(' • ')}` : '';
  }
  if (category === 'ram') {
    if (mainboard) return `Cần chọn RAM chuẩn ${mainboard.ramType} theo Mainboard`;
    if (cpu?.supportedRam?.length === 1) return `CPU này chỉ nhận RAM ${cpu.supportedRam[0]}`;
  }
  if (category === 'psu' && (cpu || vga)) {
    return `Khuyến nghị chọn Nguồn từ ${recommendedPsuWattage.value}W trở lên`;
  }
  if (category === 'case' && mainboard) {
    return `Cần Vỏ Case hỗ trợ cỡ ${mainboard.formFactor}`;
  }
  return '';
};

const getSpecBadges = (category: string, item: any): string[] => {
  if (!item) return [];
  switch (category) {
    case 'cpu':
      return [`Socket ${item.socket}`, `Hỗ trợ ${item.supportedRam.join('/')}`, `TDP ${item.tdp}W`];
    case 'mainboard':
      return [`Socket ${item.socket}`, `Chipset ${item.chipset}`, `Khe RAM ${item.ramType}`, `Cỡ ${item.formFactor}`];
    case 'ram':
      return [`Chuẩn ${item.ramType}`, `Bus ${item.speed}`, `Dung lượng ${item.capacityGb}GB`];
    case 'vga':
      return [`TDP ${item.tdp}W`, `Nguồn KN ≥ ${item.recommendedPsu}W`, `Dài ${item.lengthMm}mm`];
    case 'psu':
      return [`Công suất ${item.wattage}W`, item.efficiency];
    case 'case':
      return [`Hỗ trợ ${item.supportedFormFactors.join('/')}`, `VGA tối đa ${item.maxGpuLengthMm}mm`];
    case 'cooler':
      return [item.type, `TDP tối đa ${item.maxTdp}W`];
    default:
      return [item.sku];
  }
};

const checkCandidateCompatibility = (
  category: string,
  candidate: any
): { compatible: boolean; reason: string } => {
  if (!category || !candidate) return { compatible: true, reason: '' };
  const { cpu, mainboard, ram, vga, case: pcCase } = selectedMap.value;

  if (category === 'cpu') {
    if (mainboard && candidate.socket !== mainboard.socket) {
      return { compatible: false, reason: `Khác Socket (Main đang chọn là ${mainboard.socket})` };
    }
    if (ram && candidate.supportedRam && !candidate.supportedRam.includes(ram.ramType)) {
      return { compatible: false, reason: `Không hỗ trợ RAM ${ram.ramType}` };
    }
  }

  if (category === 'mainboard') {
    if (cpu && candidate.socket !== cpu.socket) {
      return { compatible: false, reason: `Khác Socket (CPU đang chọn là ${cpu.socket})` };
    }
    if (ram && candidate.ramType !== ram.ramType) {
      return { compatible: false, reason: `Khác chuẩn RAM (RAM đang chọn là ${ram.ramType})` };
    }
    if (pcCase && !pcCase.supportedFormFactors.includes(candidate.formFactor)) {
      return { compatible: false, reason: `Cỡ ${candidate.formFactor} không vừa Vỏ Case đang chọn` };
    }
  }

  if (category === 'ram') {
    if (mainboard && candidate.ramType !== mainboard.ramType) {
      return { compatible: false, reason: `Mainboard đang chọn chỉ nhận ${mainboard.ramType}` };
    }
    if (cpu && cpu.supportedRam && !cpu.supportedRam.includes(candidate.ramType)) {
      return { compatible: false, reason: `CPU đang chọn chỉ nhận ${cpu.supportedRam.join('/')}` };
    }
  }

  if (category === 'case') {
    if (mainboard && !candidate.supportedFormFactors.includes(mainboard.formFactor)) {
      return { compatible: false, reason: `Không lắp vừa Mainboard ${mainboard.formFactor}` };
    }
    if (vga && vga.lengthMm > candidate.maxGpuLengthMm) {
      return { compatible: false, reason: `Chiều dài VGA (${vga.lengthMm}mm) vượt cỡ Case` };
    }
  }

  if (category === 'vga') {
    if (pcCase && candidate.lengthMm > pcCase.maxGpuLengthMm) {
      return { compatible: false, reason: `Dài ${candidate.lengthMm}mm, không vừa Vỏ Case đang chọn` };
    }
  }

  if (category === 'psu') {
    if ((cpu || vga) && candidate.wattage < recommendedPsuWattage.value) {
      return { compatible: false, reason: `Công suất ${candidate.wattage}W thấp hơn mức khuyến nghị ${recommendedPsuWattage.value}W` };
    }
  }

  return { compatible: true, reason: '' };
};

const activePresetId = ref('preset-mid-intel');

const presetBuilds = [
  {
    id: 'preset-entry',
    badge: 'Tiết kiệm',
    priceLabel: '~11.8 Triệu',
    name: 'PC Gaming eSports (i3 + DDR4)',
    summary: 'i3-12100F • H610M DDR4 • 16GB • GTX 1650',
    picks: { cpu: 'c-4', mainboard: 'm-3', ram: 'r-1', vga: 'v-3', ssd: 's-1', psu: 'p-4', case: 'cs-1', cooler: 'cl-3' },
  },
  {
    id: 'preset-mid-intel',
    badge: 'Bán chạy nhất',
    priceLabel: '~23.5 Triệu',
    name: 'PC Gaming Quốc Dân (i5 + RTX 4060)',
    summary: 'i5-13400F • B760M DDR5 • 32GB • RTX 4060',
    picks: { cpu: 'c-1', mainboard: 'm-1', ram: 'r-2', vga: 'v-1', ssd: 's-1', psu: 'p-1', case: 'cs-1', cooler: 'cl-1' },
  },
  {
    id: 'preset-amd-am5',
    badge: 'Chuẩn AM5 Mới',
    priceLabel: '~23.9 Triệu',
    name: 'PC Gaming AMD (Ryzen 5 7600 + DDR5)',
    summary: 'Ryzen 5 7600 • B650M DDR5 • 32GB • RTX 4060',
    picks: { cpu: 'c-3', mainboard: 'm-6', ram: 'r-2', vga: 'v-1', ssd: 's-1', psu: 'p-1', case: 'cs-1', cooler: 'cl-1' },
  },
  {
    id: 'preset-hiend',
    badge: 'Đồ Họa & 2K/4K',
    priceLabel: '~51.8 Triệu',
    name: 'PC Hi-End Workstation (i7 + 4070S)',
    summary: 'i7-14700K • Z790 ATX • 64GB • RTX 4070 Super',
    picks: { cpu: 'c-2', mainboard: 'm-4', ram: 'r-3', vga: 'v-2', ssd: 's-2', psu: 'p-3', case: 'cs-2', cooler: 'cl-2' },
  },
];

const applyPreset = (preset: any, silent = false) => {
  activePresetId.value = preset.id;
  for (const part of parts.value) {
    const targetId = preset.picks[part.category];
    if (targetId) {
      const list = mockComponentsDatabase[part.category] || [];
      part.selected = list.find((item) => item.id === targetId) || null;
    } else {
      part.selected = null;
    }
  }
  if (!silent) {
    ElMessage.success(`Đã nạp bộ cấu hình mẫu: ${preset.name}`);
  }
};

// Nạp sẵn bộ cấu hình Bán chạy nhất lúc mới vào trang để giao diện đẹp và đầy đặn ngay lập tức
applyPreset(presetBuilds[1], true);

const isModalOpen = ref(false);
const activePart = ref<any>(null);
const modalSearch = ref('');
const onlyShowCompatible = ref(true);

const openSelectModal = (part: any) => {
  activePart.value = part;
  modalSearch.value = '';
  onlyShowCompatible.value = true;
  isModalOpen.value = true;
};

const filteredModalProducts = computed(() => {
  if (!activePart.value) return [];
  const cat = activePart.value.category;
  const list = mockComponentsDatabase[cat] || [];
  const kw = modalSearch.value.trim().toLowerCase();

  return list.filter((item) => {
    const matchKw =
      !kw ||
      item.name.toLowerCase().includes(kw) ||
      item.sku.toLowerCase().includes(kw) ||
      (item.socket && item.socket.toLowerCase().includes(kw)) ||
      (item.ramType && item.ramType.toLowerCase().includes(kw));

    if (!matchKw) return false;
    if (onlyShowCompatible.value) {
      return checkCandidateCompatibility(cat, item).compatible;
    }
    return true;
  });
});

const confirmSelectPart = (item: any) => {
  if (activePart.value) {
    activePart.value.selected = item;
    activePresetId.value = '';
  }
  isModalOpen.value = false;
  ElMessage.success(`Đã lắp: ${item.name}`);
};

const removePart = (part: any) => {
  part.selected = null;
  activePresetId.value = '';
};

const resetConfiguration = () => {
  parts.value.forEach((p) => (p.selected = null));
  activePresetId.value = '';
  ElMessage.info('Đã làm mới toàn bộ khay linh kiện');
};

const selectedCount = computed(() => parts.value.filter((p) => p.selected !== null).length);

const totalBuildPrice = computed(() => {
  return parts.value.reduce((total, p) => total + (p.selected ? p.selected.price : 0), 0);
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const printQuote = () => {
  window.print();
};

const addAllToCart = () => {
  const chosenParts = parts.value.filter((p) => p.selected !== null);
  if (chosenParts.length === 0) {
    ElMessage.warning('Vui lòng chọn ít nhất một linh kiện để thêm vào giỏ!');
    return;
  }
  const hasErrors = compatibilityIssues.value.some((i) => i.severity === 'error');
  if (hasErrors) {
    ElMessage.error('Cấu hình hiện tại đang có linh kiện xung đột phần cứng! Vui lòng kiểm tra lại trước khi đặt mua.');
    return;
  }
  chosenParts.forEach((p) => {
    cartStore.addItem({
      id: p.selected.id,
      name: `[Build PC] ${p.selected.name}`,
      price: p.selected.price,
      image: p.selected.image,
    });
  });
  ElMessage.success(`Đã thêm ${chosenParts.length} linh kiện tương thích vào giỏ hàng!`);
  cartStore.isDrawerOpen = true;
};
</script>
