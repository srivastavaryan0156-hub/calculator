/* ===== Tabs ===== */
const tabs=document.querySelectorAll('.tab');
const panels=document.querySelectorAll('.panel');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

/* ===== Standard Calculator ===== */
const display=document.getElementById('std-display');
let expr='';
document.getElementById('std-buttons').addEventListener('click',e=>{
  if(e.target.tagName!=='BUTTON')return;
  const val=e.target.dataset.val;
  if(val==='C'){expr='';display.textContent='0';return;}
  if(val==='='){
    try{
      const res=Function("return "+expr)();
      display.textContent=res;
      expr=res.toString();
    }catch{
      display.textContent="Error";
      expr='';
    }
    return;
  }
  expr+=val;
  display.textContent=expr;
});

/* ===== Age Calculator ===== */
document.getElementById('age-btn').onclick=()=>{
  const birth=new Date(document.getElementById('birthdate').value);
  if(!document.getElementById('birthdate').value){
    document.getElementById('age-result').textContent="Please pick a date";
    return;
  }
  const today=new Date();
  let age=today.getFullYear()-birth.getFullYear();
  const m=today.getMonth()-birth.getMonth();
  if(m<0||(m===0&&today.getDate()<birth.getDate()))age--;
  document.getElementById('age-result').textContent=`You are ${age} years old.`;
};

/*Baby ka figure*/
document.getElementById('bmi-btn').onclick=()=>{
  const w=parseFloat(document.getElementById('bmi-weight').value);
  const h=parseFloat(document.getElementById('bmi-height').value);
  if(!w||!h){
    document.getElementById('bmi-result').textContent="Enter weight and height";
    return;
  }
  const heightInMeters = h / 100;
const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);

  let msg="";
  if(bmi<18.5)msg="Underweight";
  else if(bmi<25)msg="Normal";
  else if(bmi<30)msg="Overweight";
  else msg="Obese";
  document.getElementById('bmi-result').textContent=`BMI: ${bmi} (${msg})`;
};

/* ===== Loan Calculator ===== */
document.getElementById('loan-btn').onclick=()=>{
  const p=parseFloat(document.getElementById('loan-amount').value);
  const r=parseFloat(document.getElementById('loan-rate').value)/100/12;
  const n=parseFloat(document.getElementById('loan-years').value)*12;
  if(!p||!r||!n){
    document.getElementById('loan-result').textContent="Enter all values";
    return;
  }
  const monthly=(p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const total=monthly*n;
  document.getElementById('loan-result').textContent=
    `Monthly: ${monthly.toFixed(2)} | Total: ${total.toFixed(2)}`;
};
