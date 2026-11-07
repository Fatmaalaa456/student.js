/**
 * نظام إدارة وتحليل نتائج الطلاب (Console-Based System)
 */

// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;         
        this.attendance = attendance; 
    }

    // 2. دوال التحليل الأكاديمي (Methods)
    calculateAverage() {
        const sum = this.grades.reduce((total, grade) => total + grade, 0);
        return sum / this.grades.length;
    }

    getGradeLetter() {
        const avg = this.calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        if (avg >= 50) return 'E';
        return 'F';
    }

    getStatus() {
        const avg = this.calculateAverage();
        if (avg >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
    new Student(101,"فاطمة علاء" , [85, 92, 88], 90),
    new Student(102, "سارة علي" , [42, 46, 44], 80),  
    new Student(103, "محمد علاء" , [65, 70, 60], 65), 
    new Student(104, "غادة محمد" , [45, 48, 43], 85)   
];
console.log("=== تقرير أداء الطلاب بالجامعة ===");
studentsList.forEach(student => {
    const avg = student.calculateAverage().toFixed(2);
    console.log('الاسم: ${student.name} | المتوسط: ${avg} | التقدير: ${student.getGradeLetter()} | النتيجة: ${student.getStatus()}');
});

// 4. لجنة الرأفة (Array Methods)
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg < 50;
});

const modifiedStruggling = strugglingStudents.map(student => {
    const originalAvg = student.calculateAverage();
    const newAvg = Math.min(100, originalAvg + 5);
    
    return {
        id: student.id,
        name: student.name,
        originalAverage: originalAvg.toFixed(2),
        newAverage: newAvg.toFixed(2),
        statusAfterClemency: newAvg >= 50 ? "ناجح بالرأفة" : "يحتاج مراجعة"
    };
});

const totalNewAverages = modifiedStruggling.reduce((sum, student) => {
    return sum + parseFloat(student.newAverage);
}, 0);

const count = modifiedStruggling.length;
const generalStrugglingAverage = count > 0 ? (totalNewAverages / count).toFixed(2) : "لا توجد حالات";

// 5. المخرجات (Console Logging)
console.log("=== مصفوفة الطلاب المتعثرين المشمولين بالرأفة ===");
console.table(modifiedStruggling);

console.log("=== متوسط درجات الطلاب المتعثرين بعد التعديل ===");
console.log('متوسط المتعثرين بعد الرأفة: ${generalStrugglingAverage}');