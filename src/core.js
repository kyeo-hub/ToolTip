class TooltipLibrary {
  constructor(options = {}) {
    if (typeof document === 'undefined') {
      return; // 在服务器端不执行任何操作
    }

    this.config = {
      attribute: 'data-tip',
      position: 'top',
      offset: 8,
      theme: 'dark',
      ...options,
    };
    this.applyTheme(); // 新增初始化主题应用
    this.tooltip = null;
    this.init();

  }

  init() {
    this.createTooltipElement();
    this.setupEventListeners();
  }

  createTooltipElement() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    document.body.appendChild(this.tooltip);
  }

  setupEventListeners() {
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(`[${this.config.attribute}]`);
      if (target) {
        this.showTooltip(target);
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (
        !e.relatedTarget ||
        !e.relatedTarget.closest(`[${this.config.attribute}]`)
      ) {
        this.hideTooltip();
      }
    });
    // 添加点击触发支持
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-tip-trigger="click"]')) {
        this.showTooltip(e.target);
      }
    });
  }

  // 新增主题应用方法
  applyTheme() {
    const theme = this.config.theme;
    this.tooltip.classList.remove('tooltip-dark', 'tooltip-light');
    this.tooltip.classList.add(`tooltip-${theme}`);
    
    // 同步data属性给CSS使用
    this.tooltip.dataset.theme = theme;
  }
  // 新增主题切换方法
  setTheme(newTheme) {
    this.config.theme = newTheme;
    this.applyTheme();
  }
  showTooltip(target) {
    // 在显示前检查元素级主题覆盖
    const elementTheme = target.getAttribute(`${this.config.attribute}-theme`);
    if (elementTheme) {
      this.tooltip.dataset.theme = elementTheme;
    } else {
      this.applyTheme(); // 恢复全局主题
    }
    const position =
      target.getAttribute(`${this.config.attribute}-position`) ||
      this.config.position;
    const template = target.dataset.tipTemplate;

    // 先设置内容
    if (template) {
      this.tooltip.innerHTML = document.getElementById(template).innerHTML;
    } else {
      this.tooltip.textContent = target.getAttribute(this.config.attribute);
    }

    // 显示元素以获取正确尺寸
    this.tooltip.style.display = 'block';
    this.tooltip.setAttribute('data-position', position);

    // 强制同步布局（确保获取最新尺寸）
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // 计算基础位置（包含滚动偏移）
    let top, left;
    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - this.config.offset;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + this.config.offset;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - this.config.offset;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + this.config.offset;
        break;
      default:
        top = targetRect.top - tooltipRect.height - this.config.offset;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
    }

    // 转换为文档坐标
    top += window.scrollY;
    left += window.scrollX;

    // 智能边界检测
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };

    // 水平边界
    if (left + tooltipRect.width > viewport.scrollX + viewport.width) {
      left = viewport.width + viewport.scrollX - tooltipRect.width - 5;
    } else if (left < viewport.scrollX + 5) {
      left = viewport.scrollX + 5;
    }

    // 垂直边界
    if (top + tooltipRect.height > viewport.scrollY + viewport.height) {
      top = viewport.height + viewport.scrollY - tooltipRect.height - 5;
    } else if (top < viewport.scrollY + 5) {
      top = viewport.scrollY + 5;
    }

    // 应用最终位置
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
    // 当位置被边界检测调整后，修正箭头方向
    const finalRect = this.tooltip.getBoundingClientRect();
    const actualPosition = this.calculateActualPosition(targetRect, finalRect);
    this.tooltip.setAttribute('data-position', actualPosition);
  }
  // 添加新方法
  calculateActualPosition(targetRect, tooltipRect) {
    const originalPos = this.tooltip.getAttribute('data-position');
    const viewportCenterX = window.innerWidth / 2;

    // 如果水平位置被大幅调整，自动切换左右位置
    if (Math.abs(tooltipRect.left - targetRect.left) > targetRect.width * 2) {
      return tooltipRect.left < viewportCenterX ? 'right' : 'left';
    }
    return originalPos;
  }

  hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  // 销毁方法
  destroy() {
    document.body.removeChild(this.tooltip);
    document.removeEventListener('mouseover', this.showTooltip);
    document.removeEventListener('mouseout', this.hideTooltip);
  }
}

export default TooltipLibrary
