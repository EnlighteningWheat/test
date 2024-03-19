
const jwt=require('jsonwebtoken')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',     // 数据库主机名
  user: 'root', // 数据库用户名
  password: '1234', // 数据库密码
  database: '202103_hqm_mis' // 数据库名称
});
// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('连接数据库失败:', err);
    return;
  }
  console.log('成功连接到数据库');
})

exports.deleteCourse=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const Tno=req.body.teacherID
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Ano = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Ano);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' DELETE FROM hqm_course WHERE Cno=?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("课程删除成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.FindCourse=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var Tno=req.body.teacherID
  Tno=Tno+"%"
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT * from hqm_course WHERE Cno like ?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("找不到学生账号")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("查询学生成功")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const { cname,Tname,Cdate,Cmode,Ccredit,Chour,cno} = result;
        return {  cname,Tname,Cdate,Cmode,Ccredit,Chour ,cno};
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.CourseChange=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
  var courseID=req.body.courseID

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' UPDATE hqm_course set Cname=?,Tname=?,Cdate=?,Cmode=?,Ccredit=?,Chour=? WHERE Cno=?';
      connection.query(query, [name,gender,age,title,phone,teacherID,courseID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("修改课程信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.CourseIncrease=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
  var courseID=req.body.courseID
    console.log(courseID)

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' insert into hqm_course(cname,Tname,Cdate,Cmode,Ccredit,Chour,cno) VALUES(?,?,?,?,?,?,?)';
      connection.query(query, [name,gender,age,title,phone,teacherID,courseID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("插入课程信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.MStudentPassword=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const Tno=req.body.teacherID
  const password=req.body.password
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'UPDATE hqm_student_account set Skey=? where Sno=?';
      connection.query(query, [password,Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("学生密码修改成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.deleteStudent=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const Tno=req.body.teacherID
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Ano = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Ano);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' DELETE FROM hqm_student WHERE Sno=?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("学生删除成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.FindStudent=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var Tno=req.body.teacherID
  Tno=Tno+'%'
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT * from hqm_student WHERE Sno like ?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("找不到学生账号")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("查询学生成功")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const { Sname,Ssex,Sage,Clno,Sareas,Sno } = result;
        return { Sname,Ssex,Sage,Clno,Sareas,Sno };
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.StudentChange=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' UPDATE hqm_Student set Sname=?,Ssex=?,Sage=?,Clno=?,Sareas=? WHERE Sno=?';
      connection.query(query, [name,gender,age,title,phone,teacherID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("修改学生信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.StudentIncrease=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' insert into hqm_student(Sname,Ssex,Sage,Clno,Sareas,Sno) VALUES(?,?,?,?,?,?)';
      connection.query(query, [name,gender,age,title,phone,teacherID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("插入学生信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.MTeacherPassword=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const Tno=req.body.teacherID
  const password=req.body.password
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'UPDATE hqm_teachers_account set Tkey=? where Tno=?';
      connection.query(query, [password,Tno], (error, results) => {

      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("教师密码修改成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.deleteTeacher=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const Tno=req.body.teacherID
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Ano = decoded.Sno; // 获取 Sno 属性的值
      console.log('Ano:', Ano);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' DELETE FROM hqm_teachers WHERE Tno=?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("删除成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.FindTeacher=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var Tno=req.body.teacherID
  Tno=Tno+'%'
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT * from hqm_teachers WHERE Tno like ?';
      connection.query(query, [Tno], (error, results) => {
      console.log("成绩查询")
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("发送1")
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("找不到学生账号")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("发送2")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const { Tname,Tsex,Tage,Tpos,Tpho,Tno } = result;
        return { Tname,Tsex,Tage,Tpos,Tpho,Tno };
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.TeacherChange=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Tno:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' UPDATE hqm_teachers set Tname=?,Tsex=?,Tage=?,Tpos=?,Tpho=? WHERE Tno=?';
      connection.query(query, [name,gender,age,title,phone,teacherID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("插入教师信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.TeacherIncrease=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var name=req.body.name;
  var gender=req.body.gender
  var age=req.body.age
  var title=req.body.title
  var phone=req.body.phone
  var teacherID=req.body.teacherID
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Tno:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' insert into hqm_teachers(Tname,Tsex,Tage,Tpos,Tpho,Tno) VALUES(?,?,?,?,?,?)';
      connection.query(query, [name,gender,age,title,phone,teacherID], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
     console.log("插入教师信息成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.NewMpassword=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const { newPassword } = req.body
  var password=req.body.password
  console.log("收到信息");
  console.log(req.body);
  console.log(req.body.password)
  console.log("密码"+password)
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Tno:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' update hqm_adimin_acccount set Akey=? WHERE Ano= ?';
      connection.query(query, [password,Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("密码修改成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.pushStudentScore=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  var Cno=req.body.Cno;
  var Sno=req.body.Sno
  var Score=req.body.Score
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Tno:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' SELECT Cno from hqm_tea_cour  WHERE Tno=?';
      connection.query(query, [Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("找不到学生账号")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      const query1='INSERT hqm_reports(Cno,Sno,Score) VALUES(?,?,?)'
      connection.query(query1,[Cno,Sno,Score],(error,results)=>{
        if (error) {
          console.error('查询数据库失败:', error);
          return res.status(500).json({ error: '查询数据库失败' });
        }
        console.log("插入成功")
      })
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.MyStudentScore=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT Sname,Score from hqm_reports,hqm_student,hqm_teachers where hqm_reports.Tname=hqm_teachers.Tname and hqm_reports.Sno=hqm_student.Sno and Tno=?';
      connection.query(query, [sno], (error, results) => {
      console.log("成绩查询")
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("教师任课信息查询")
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("查询为空值")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("发送2")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const { Sname ,Score} = result;
        return { Sname ,Score};
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }

}

exports.AverageScore=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT Cname,`avg(Score)` As Score from hqm_averge_score,hqm_course,hqm_teachers WHERE hqm_averge_score.Cno=hqm_course.Cno and hqm_course.Tname=hqm_teachers.Tname and Tno=?';
      connection.query(query, [sno], (error, results) => {
      console.log("成绩查询")
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("教师任课信息查询")
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("查询为空值")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("发送2")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const { Cname ,Score} = result;
        return { Cname ,Score};
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }


}

exports.TeachCourse=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
  try {
    const decoded = jwt.verify(token, 'hqm'); // 解码 Token
    const sno = decoded.Sno; // 获取 Sno 属性的值
    console.log('Sno:', sno);
    // 在这里进行后续的操作，使用获取到的 Sno 值
      // 查询数据库，获取学生信息
    const query = 'SELECT Cname,Cdate,Cmode,Ccredit,Chour FROM hqm_course,hqm_teachers WHERE hqm_teachers.Tname=hqm_course.Tname and Tno=? ';
    connection.query(query, [sno], (error, results) => {
    console.log("成绩查询")
    if (error) {
      console.error('查询数据库失败:', error);
      return res.status(500).json({ error: '查询数据库失败' });
    }
    console.log("教师任课信息查询")
    if (results.length == 0) {
      // 如果找不到学生账号
      console.log("查询为空值")
      return res.status(404).json({ error: '找不到学生账号' });
    }
    console.log("发送2")

    // 提取所需信息
    const gradeData = results.map((result) => {
      const { Cname, Cdate, Cmode, Ccredit,Chour } = result;
      return { Cname, Cdate, Cmode, Ccredit,Chour};
    });
    
    // 发送信息给客户端
    res.json(gradeData);
    console.log(gradeData);
    console.log("成功发送信息")
  });
  } catch (error) {
    // 处理解码失败的情况
    console.error('Token 解码失败:', error);
  }
} else {
  // 处理未提供或格式不正确的 Token 的情况
  console.error('未提供有效的 Token');
}

}

exports.TeacherInfo=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
  try {
    const decoded = jwt.verify(token, 'hqm'); // 解码 Token
    const sno = decoded.Sno; // 获取 Sno 属性的值
    console.log('Sno:', sno);
    // 在这里进行后续的操作，使用获取到的 Sno 值
      // 查询数据库，获取学生信息
    const query = 'SELECT * from hqm_teachers WHERE Tno=?';
    connection.query(query, [sno], (error, results) => {
    if (error) {
      console.error('查询数据库失败:', error);
      return res.status(500).json({ error: '查询数据库失败' });
    }
    console.log("发送1")
    if (results.length == 0) {
      // 如果找不到学生账号
      console.log("找不到学生账号")
      return res.status(404).json({ error: '找不到学生账号' });
    }
    console.log("发送2")

    // 提取所需信息
    const { Tno,Tname, Tsex, Tage, Tpos, Tpho } = results[0];
    console.log( {Tno, Tname, Tsex, Tage, Tpos, Tpho })
    // 发送信息给客户端
    res.json({ Tno,Tname, Tsex, Tage, Tpos, Tpho });
    console.log("成功发送信息")
  });
  } catch (error) {
    // 处理解码失败的情况
    console.error('Token 解码失败:', error);
  }
} else {
  // 处理未提供或格式不正确的 Token 的情况
  console.error('未提供有效的 Token');
}
}

exports.NewTpassword=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const { newPassword } = req.body
  var password=req.body.password
  console.log("收到信息");
  console.log(req.body);
  console.log(req.body.password)
  console.log("密码"+password)
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const Tno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Tno:', Tno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' update hqm_teachers_account set Tkey=? WHERE Tno= ?';
      connection.query(query, [password,Tno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("密码修改成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.Newpassword=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
  const { newPassword } = req.body
  var password=req.body.password
  console.log(req.body);
  console.log(req.body.password)
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = ' update hqm_student_account set Skey=? WHERE sno= ?';
      connection.query(query, [password,sno], (error, results) => {
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("密码修改成功")
      res.send("200")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
}

exports.Schedule=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
    try {
      const decoded = jwt.verify(token, 'hqm'); // 解码 Token
      const sno = decoded.Sno; // 获取 Sno 属性的值
      console.log('Sno:', sno);
      // 在这里进行后续的操作，使用获取到的 Sno 值
        // 查询数据库，获取学生信息
      const query = 'SELECT hqm_course.cname,Tname,hqm_course.Cdate,hqm_course.Cmode,hqm_course.Ccredit,hqm_course.Chour,hqm_course.cno from hqm_class_courlist,hqm_course where hqm_course.cno=hqm_class_courlist.cno and  hqm_class_courlist.clno in (SELECT clno FROM hqm_student WHERE sno=?)';
      connection.query(query, [sno], (error, results) => {
      console.log("课表查询")
      if (error) {
        console.error('查询数据库失败:', error);
        return res.status(500).json({ error: '查询数据库失败' });
      }
      console.log("发送1")
      if (results.length == 0) {
        // 如果找不到学生账号
        console.log("找不到学生账号")
        return res.status(404).json({ error: '找不到学生账号' });
      }
      console.log("发送2")
  
      // 提取所需信息
      const gradeData = results.map((result) => {
        const {cname,Tname,Cdate,Cmode,Ccredit,Chour,cno} = result;
        return { cname,Tname,Cdate,Cmode,Ccredit,Chour,cno};
      });
      
      // 发送信息给客户端
      res.json(gradeData);
      console.log(gradeData);
      console.log("成功发送信息")
    });
    } catch (error) {
      // 处理解码失败的情况
      console.error('Token 解码失败:', error);
    }
  } else {
    // 处理未提供或格式不正确的 Token 的情况
    console.error('未提供有效的 Token');
  }
  
}

exports.personalscore=(req,res)=>{
  const authorizationHeader = req.headers.authorization;
    

if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
  try {
    const decoded = jwt.verify(token, 'hqm'); // 解码 Token
    const sno = decoded.Sno; // 获取 Sno 属性的值
    console.log('Sno:', sno);
    // 在这里进行后续的操作，使用获取到的 Sno 值
      // 查询数据库，获取学生信息
    const query = 'SELECT Cname, Score, Dates,hqm_reports.Tname FROM hqm_reports, hqm_student, hqm_course WHERE hqm_reports.sno = hqm_student.sno AND hqm_reports.cno = hqm_course.cno AND hqm_student.Sno = ?;';
    connection.query(query, [sno], (error, results) => {
    console.log("成绩查询")
    if (error) {
      console.error('查询数据库失败:', error);
      return res.status(500).json({ error: '查询数据库失败' });
    }
    console.log("发送1")
    if (results.length == 0) {
      // 如果找不到学生账号
      console.log("找不到学生账号")
      return res.status(404).json({ error: '找不到学生账号' });
    }
    console.log("发送2")

    // 提取所需信息
    const gradeData = results.map((result) => {
      const { Cname, Score, Dates, Tname } = result;
      return { Cname, Score, Dates, Tname };
    });
    
    // 发送信息给客户端
    res.json(gradeData);
    console.log(gradeData);
    console.log("成功发送信息")
  });
  } catch (error) {
    // 处理解码失败的情况
    console.error('Token 解码失败:', error);
  }
} else {
  // 处理未提供或格式不正确的 Token 的情况
  console.error('未提供有效的 Token');
}


}
//个人信息请求
exports.personalinfo = (req, res) => {
    const authorizationHeader = req.headers.authorization;
    

if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  const token = authorizationHeader.slice(7); // 去除 "Bearer "，保留后面的部分
  try {
    const decoded = jwt.verify(token, 'hqm'); // 解码 Token
    const sno = decoded.Sno; // 获取 Sno 属性的值
    console.log('Sno:', sno);
    // 在这里进行后续的操作，使用获取到的 Sno 值
      // 查询数据库，获取学生信息
    const query = 'SELECT Sname, Ssex, Sage, Clno, Sno, Sareas, Scredits FROM hqm_student WHERE Sno = ?';
    connection.query(query, [sno], (error, results) => {
    console.log("成查询")
    if (error) {
      console.error('查询数据库失败:', error);
      return res.status(500).json({ error: '查询数据库失败' });
    }
    console.log("发送1")
    if (results.length == 0) {
      // 如果找不到学生账号
      console.log("找不到学生账号")
      return res.status(404).json({ error: '找不到学生账号' });
    }
    console.log("发送2")

    // 提取所需信息
    const { Sname, Ssex, Sage, Clno, Sno, Sareas, Scredits } = results[0];
    console.log( { Sname, Ssex, Sage, Clno, Sno, Sareas, Scredits})
    // 发送信息给客户端
    res.json({ Sname, Ssex, Sage, Clno, Sno, Sareas, Scredits});
    console.log("成功发送信息")
  });
  } catch (error) {
    // 处理解码失败的情况
    console.error('Token 解码失败:', error);
  }
} else {
  // 处理未提供或格式不正确的 Token 的情况
  console.error('未提供有效的 Token');
}

  
};

exports.student=(req,res)=>{
    const userinfo=req.body
    res.send('resUser')
},

//登录请求
exports.login = (req, res) => {
    console.log('接收到信息');
     
    const identity = req.query.identity;
    const email = req.query.email;
    const password = req.query.password;
    var sql;
    let tableName = '';
    let redirectURL = '';
    // 根据身份选择对应的表名和重定向 URL
    if (identity === 'student') {
        tableName = 'hqm_student_account';
        redirectURL = 'http://127.0.0.1:90/public/student.html';
        sql='SELECT * FROM hqm_student_account WHERE Sno = ? AND Skey = ?'
    } else if (identity === 'teacher') {
        tableName = 'hqm_teachers_account';
        redirectURL = 'http://127.0.0.1:90/public/teacher.html';
        sql='SELECT * FROM hqm_teachers_account WHERE Tno = ? AND Tkey = ?'
    } else if (identity === 'manager') {
        tableName = 'hqm_manager_account';
        redirectURL = 'http://127.0.0.1:90/public/manager.html';
        sql='SELECT * FROM hqm_adimin_acccount WHERE Ano = ? AND Akey = ?'
    }

    // 在对应的账号表中执行验证逻辑
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('查询数据失败:', err);
            return;
        }

        // 验证成功
        if (results.length > 0) {
            console.log('验证成功');
            req.session.account = email;
            const tokenStr='Bearer '+jwt.sign({Sno:email},'hqm',{expiresIn:'30h'})
            // 构造要返回的 JSON 数据
            const responseData = {
                message: '验证成功',
                url: redirectURL,
                token:tokenStr
            };
            res.json(responseData);
        } else {
            // 验证失败
            console.log('验证失败');
            const responseData = {
                message: '验证失败'
            };
            res.json(responseData);
        }
    });
};
