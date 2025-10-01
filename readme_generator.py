import json
import os
import sys
import argparse
from datetime import datetime
from typing import Dict, List, Optional
import random

class UltimateReadmeGenerator:
    """
    🚀 Next-generation GitHub Profile README Generator
    With responsive design, animated components, and interactive elements
    """
    
    def __init__(self):
        self.config = {}
        self.animation_styles = [
            "fade-in", "slide-up", "zoom-in", "bounce-in", "flip-in"
        ]
        self.gradient_presets = [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", 
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        ]
    
    def load_config(self, config_file: str = "config.json") -> Dict:
        """Load user configuration with enhanced error handling"""
        try:
            if os.path.exists(config_file):
                with open(config_file, 'r', encoding='utf-8') as f:
                    self.config = json.load(f)
                print(f"🎯 Configuration loaded from {config_file}")
                return self.config
            else:
                print("🔄 Configuration file not found. Starting interactive setup...")
                return self.create_interactive_config()
        except Exception as e:
            print(f"❌ Error loading config: {e}")
            return self.create_interactive_config()
    
    def create_interactive_config(self) -> Dict:
        """Enhanced interactive configuration with rich prompts"""
        print("\n" + "="*60)
        print("🎨 ULTIMATE GITHUB PROFILE README GENERATOR")
        print("="*60)
        print("\nLet's create your stunning profile! ✨\n")
        
        # Enhanced Basic Information
        self.config["basic_info"] = {
            "name": input("👤 Your Full Name: ").strip() or "Awesome Developer",
            "github_username": input("🐙 GitHub Username: ").strip() or "developer",
            "tagline": input("💫 Your Tagline: ").strip() or "Code • Create • Innovate 🚀",
            "role": input("💼 Your Role (e.g., Full Stack Developer): ").strip() or "Software Developer",
            "location": input("📍 Location (optional): ").strip() or "Earth 🌍",
            "available_for_work": input("🤝 Available for work? (y/n): ").strip().lower() == 'y'
        }
        
        # Enhanced About Me with rich content
        print("\n📖 ABOUT ME SECTION")
        print("────────────────────")
        self.config["about_me"] = {
            "intro": input("🎯 Introduction (1-2 sentences): ").strip() or "Passionate developer crafting digital solutions",
            "passions": [x.strip() for x in input("❤️ Passions (comma separated): ").split(',') if x.strip()] or ["Coding", "Open Source", "Innovation"],
            "goals": [x.strip() for x in input("🎯 Goals (comma separated): ").split(',') if x.strip()] or ["Build amazing projects", "Learn continuously"],
            "fun_facts": [x.strip() for x in input("🎉 Fun facts (comma separated): ").split(',') if x.strip()] or ["I love coding!"] 
        }
        
        # Enhanced Tech Stack with categories
        print("\n🛠️ TECH STACK")
        print("─────────────")
        self.config["tech_stack"] = {
            "languages": [x.strip() for x in input("💻 Languages (comma separated): ").split(',') if x.strip()] or ["JavaScript", "Python"],
            "frontend": [x.strip() for x in input("🎨 Frontend (comma separated): ").split(',') if x.strip()] or ["React", "Vue"],
            "backend": [x.strip() for x in input("⚙️ Backend (comma separated): ").split(',') if x.strip()] or ["Node.js", "Express"],
            "databases": [x.strip() for x in input("🗄️ Databases (comma separated): ").split(',') if x.strip()] or ["MongoDB", "PostgreSQL"],
            "devops": [x.strip() for x in input("☁️ DevOps & Cloud (comma separated): ").split(',') if x.strip()] or ["Docker", "AWS"],
            "tools": [x.strip() for x in input("🔧 Tools (comma separated): ").split(',') if x.strip()] or ["Git", "VS Code"]
        }
        
        # Current Focus
        print("\n📚 CURRENTLY...")
        print("──────────────")
        self.config["currently"] = {
            "working_on": input("🔭 Working on: ").strip() or "Amazing projects",
            "learning": input("🌱 Learning: ").strip() or "New technologies", 
            "collaborating": input("👯 Collaborating on: ").strip() or "Open source projects",
            "goals": input("🎯 2024 Goals: ").strip() or "Build, learn, grow"
        }
        
        # Enhanced Social Links
        print("\n🔗 SOCIAL LINKS")
        print("───────────────")
        self.config["social_links"] = {
            "portfolio": input("🌐 Portfolio URL: ").strip() or None,
            "email": input("📧 Email: ").strip() or None,
            "linkedin": input("💼 LinkedIn: ").strip() or None,
            "twitter": input("🐦 Twitter/X: ").strip() or None,
            "youtube": input("🎥 YouTube: ").strip() or None,
            "devto": input("📝 Dev.to: ").strip() or None,
            "buymeacoffee": input("☕ Buy Me a Coffee: ").strip() or None,
            "polywork": input("🔗 Polywork: ").strip() or None
        }
        
        # Visual Preferences
        print("\n🎨 VISUAL PREFERENCES")
        print("─────────────────────")
        self.config["style"] = {
            "theme": input("🎭 Theme (dark/light/auto): ").strip() or "dark",
            "animation_level": input("✨ Animation level (minimal/moderate/heavy): ").strip() or "moderate",
            "gradient": input("🌈 Use gradient headers? (y/n): ").strip().lower() == 'y'
        }
        
        # Save configuration
        config_file = "config.json"
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(self.config, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Configuration saved to {config_file}")
        return self.config
    
    def generate_animated_badge(self, tech: str, category: str) -> str:
        """Generate animated badges with category-based styling"""
        color_schemes = {
            "languages": {"color": "blue", "emoji": "💻"},
            "frontend": {"color": "green", "emoji": "🎨"}, 
            "backend": {"color": "orange", "emoji": "⚙️"},
            "databases": {"color": "yellow", "emoji": "🗄️"},
            "devops": {"color": "purple", "emoji": "☁️"},
            "tools": {"color": "pink", "emoji": "🔧"}
        }
        
        scheme = color_schemes.get(category, {"color": "blue", "emoji": "⚡"})
        tech_slug = tech.replace(' ', '%20')
        
        return f"<img src=\"https://img.shields.io/badge/{scheme['emoji']}-{tech_slug}-{scheme['color']}?style=for-the-badge&logo={tech.lower()}&logoColor=white\" alt=\"{tech}\"/>"
    
    def generate_skill_bar(self, skill: str, level: int) -> str:
        """Generate animated skill progress bars"""
        return f"""
<div class=\"skill-item\">
  <span class=\"skill-name\">{skill}</span>
  <div class=\"skill-bar\">
    <div class=\"skill-progress\" data-level=\"{level}\" style=\"width: {level}%\"></div>
  </div>
  <span class=\"skill-percent\">{level}%</span>
</div>"""
    
    def generate_readme(self) -> str:
        """Generate the ultimate README with advanced features"""
        sections = [
            self._generate_hero_section(),
            self._generate_about_section(), 
            self._generate_skills_section(),
            self._generate_tech_stack(),
            self._generate_github_metrics(),
            self._generate_current_focus(),
            self._generate_projects_showcase(),
            self._generate_achievements(),
            self._generate_connect_section(),
            self._generate_footer()
        ]
        
        # Add CSS for animations and responsive design
        css_styles = self._generate_css_styles()
        full_readme = f"{css_styles}\n\n" + "\n\n".join(sections)
        
        return full_readme
    
    def _generate_css_styles(self) -> str:
        """Generate responsive CSS styles and animations"""
        return """<!-- 🎨 RESPONSIVE STYLES & ANIMATIONS -->
<style>
  /* Base Responsive Design */
  .readme-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }
  
  /* Smooth Animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
  
  /* Animated Elements */
  .animated-section {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .gradient-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  /* Skill Bars Animation */
  .skill-bar {
    background: #2d3748;
    border-radius: 10px;
    overflow: hidden;
    height: 8px;
    margin: 5px 0;
  }
  
  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 10px;
    animation: skillFill 2s ease-in-out;
  }
  
  @keyframes skillFill {
    from { width: 0% !important; }
  }
  
  /* Responsive Grid */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }
  
  /* Hover Effects */
  .social-badge {
    transition: all 0.3s ease;
    display: inline-block;
  }
  
  .social-badge:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .readme-container {
      padding: 10px;
    }
    
    .tech-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    h1 { font-size: 1.8em !important; }
    h2 { font-size: 1.4em !important; }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .social-badge {
      margin: 5px;
    }
  }
  
  /* Dark/Light Theme Support */
  @media (prefers-color-scheme: light) {
    .skill-bar { background: #e2e8f0; }
  }
</style>

<div class="readme-container">"""
    
    def _generate_hero_section(self) -> str:
        """Generate animated hero section with gradients"""
        basic = self.config.get("basic_info", {})
        gradient = random.choice(self.gradient_presets)
        
        return f"""
<!-- 🚀 HERO SECTION -->
<div align="center" class="animated-section">

<br/>
  
<div>
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=26&duration=4000&pause=1000&color=764BA2&center=true&vCenter=true&width=435&lines=Hi+👋+I'm+{basic.get('name', 'Developer')};{basic.get('role', 'Full Stack Developer')};{basic.get('tagline', 'Code • Create • Innovate')}" alt="Typing Animation" />
</div>

<br/>

![GitHub Followers](https://img.shields.io/github/followers/{basic.get('github_username', 'developer')}?style=for-the-badge&color=764BA2&label=Follow%20Me&logo=github)
![Profile Views](https://komarev.com/ghpvc/?username={basic.get('github_username', 'developer')}&style=for-the-badge&color=764BA2&label=Profile+Views)
{"![Available for Work](https://img.shields.io/badge/🤝_Available_for_Work-Yes-764BA2?style=for-the-badge)" if basic.get('available_for_work') else ""}

<br/>

<div style="background: {gradient}; padding: 2px; border-radius: 15px; display: inline-block;">
  <div style="background: #0d1117; padding: 20px 40px; border-radius: 13px; display: inline-block;">
    <h2 style="margin: 0; background: {gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
      💫 {basic.get('location', 'Building from Earth 🌍')}
    </h2>
  </div>
</div>

<br/>
<br/>

</div>"""
    
    def _generate_about_section(self) -> str:
        """Generate interactive about me section"""
        about = self.config.get("about_me", {})
        
        return f"""
<!-- 👤 ABOUT ME -->
<div class="animated-section">

## 🎯 About Me

<div style="background: linear-gradient(135deg, #1a1f2e, #2d3748); padding: 25px; border-radius: 15px; border-left: 4px solid #764BA2;">

### 💫 {about.get('intro', 'Passionate developer crafting digital solutions')}

**What drives me:**
{''.join([f'• 🎯 {passion}\\n' for passion in about.get('passions', [])])}

**My goals:**
{''.join([f'• 🚀 {goal}\\n' for goal in about.get('goals', [])])}

<details>
<summary><b>🎉 Fun Facts About Me</b></summary>
<br/>
{''.join([f'• ✨ {fact}\\n' for fact in about.get('fun_facts', [])])}
</details>

</div>

<br/>

> 🧠 **"First solve the problem, then write the code."** - John Johnson  
> 💡 **"Clean code always looks like it was written by someone who cares."** - Robert C. Martin

</div>"""
    
    def _generate_skills_section(self) -> str:
        """Generate animated skills progress section"""
        return """
<!-- 🛠️ SKILLS & EXPERTISE -->
<div class="animated-section">

## 🎯 Skills & Expertise

<div class="tech-grid">

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px;">
<h3>🎨 Frontend Development</h3>
""" + self.generate_skill_bar("React", 90) + self.generate_skill_bar("Vue.js", 85) + self.generate_skill_bar("TypeScript", 88) + """
</div>

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px;">
<h3>⚙️ Backend Development</h3>
""" + self.generate_skill_bar("Node.js", 92) + self.generate_skill_bar("Python", 85) + self.generate_skill_bar("API Design", 88) + """
</div>

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px;">
<h3>☁️ DevOps & Cloud</h3>
""" + self.generate_skill_bar("Docker", 80) + self.generate_skill_bar("AWS", 75) + self.generate_skill_bar("CI/CD", 82) + """
</div>

</div>

</div>"""
    
    def _generate_tech_stack(self) -> str:
        """Generate animated tech stack with categories"""
        tech = self.config.get("tech_stack", {})
        
        tech_content = ""
        categories = [
            ("💻 Languages", tech.get("languages", []), "languages"),
            ("🎨 Frontend", tech.get("frontend", []), "frontend"),
            ("⚙️ Backend", tech.get("backend", []), "backend"), 
            ("🗄️ Databases", tech.get("databases", []), "databases"),
            ("☁️ DevOps & Cloud", tech.get("devops", []), "devops"),
            ("🔧 Tools", tech.get("tools", []), "tools")
        ]
        
        for title, items, category in categories:
            if items:
                tech_content += f"\n### {title}\n\n"
                badges = " ".join([self.generate_animated_badge(item, category) for item in items if item.strip()])
                tech_content += f"{badges}\n<br/>\n"
        
        return f"""
<!-- 🛠️ TECH STACK -->
<div class="animated-section">

## 🚀 Tech Stack & Tools

<div style="background: linear-gradient(135deg, #1a1f2e, #2d3748); padding: 25px; border-radius: 15px;">
{tech_content}
</div>

</div>"""
    
    def _generate_github_metrics(self) -> str:
        """Generate advanced GitHub metrics with animations"""
        username = self.config.get("basic_info", {}).get("github_username", "developer")
        
        return f"""
<!-- 📊 GITHUB METRICS -->
<div class="animated-section">

## 📈 GitHub Analytics

<div align="center">

<div class="stats-grid">

![GitHub Stats](https://github-readme-stats.vercel.app/api?username={username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true&custom_title=GitHub%20Stats&card_width=400)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username={username}&layout=compact&theme=tokyonight&hide_border=true&card_width=400)

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user={username}&theme=tokyonight&hide_border=true&card_width=400)

![GitHub Trophies](https://github-profile-trophy.vercel.app/?username={username}&theme=tokyonight&no-frame=true&margin-w=15&row=2&column=4)

</div>

<br/>

![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username={username}&theme=github-compact&hide_border=true&area=true&custom_title=Contribution%20Graph)

![Snake Animation](https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg)

</div>

</div>"""
    
    def _generate_current_focus(self) -> str:
        """Generate current focus section"""
        current = self.config.get("currently", {})
        
        return f"""
<!-- 📚 CURRENT FOCUS -->
<div class="animated-section">

## 🎯 Currently...

<div style="background: linear-gradient(135deg, #2d3748, #4a5568); padding: 25px; border-radius: 15px; border-left: 4px solid #764BA2;">

- 🔭 **Working on**: {current.get('working_on', 'Amazing projects')}
- 🌱 **Learning**: {current.get('learning', 'New technologies')}  
- 👯 **Collaborating on**: {current.get('collaborating', 'Open source projects')}
- 🎯 **2024 Goals**: {current.get('goals', 'Build, learn, grow')}
- 💡 **Fun Fact**: I write code that writes code! 🤖

</div>

</div>"""
    
    def _generate_projects_showcase(self) -> str:
        """Generate interactive projects showcase"""
        return """
<!-- 💼 PROJECTS SHOWCASE -->
<div class="animated-section">

## 🚀 Featured Projects

<div class="tech-grid">

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px; border: 1px solid #2d3748;">
<h3>🎨 Frontend Masterpiece</h3>
<p>Modern React application with stunning UI</p>
<p><code>React</code> <code>TypeScript</code> <code>Tailwind</code></p>
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-764BA2?style=for-the-badge)](https://demo.com)
[![Source Code](https://img.shields.io/badge/📦_Source_Code-2D3748?style=for-the-badge)](https://github.com)
</div>

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px; border: 1px solid #2d3748;">
<h3>⚙️ Backend Powerhouse</h3>
<p>Scalable Node.js API with advanced features</p>
<p><code>Node.js</code> <code>Express</code> <code>MongoDB</code></p>
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-764BA2?style=for-the-badge)](https://demo.com)
[![Source Code](https://img.shields.io/badge/📦_Source_Code-2D3748?style=for-the-badge)](https://github.com)
</div>

<div style="background: #1a1f2e; padding: 20px; border-radius: 12px; border: 1px solid #2d3748;">
<h3>🤖 AI Innovation</h3>
<p>Machine learning project with real-world impact</p>
<p><code>Python</code> <code>TensorFlow</code> <code>FastAPI</code></p>
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-764BA2?style=for-the-badge)](https://demo.com)
[![Source Code](https://img.shields.io/badge/📦_Source_Code-2D3748?style=for-the-badge)](https://github.com)
</div>

</div>

<br/>

<div align="center">
[![View All Projects](https://img.shields.io/badge/📚_View_All_Projects-764BA2?style=for-the-badge&logo=github)](https://github.com/username?tab=repositories)
</div>

</div>"""
    
    def _generate_achievements(self) -> str:
        """Generate achievements and milestones section"""
        return """
<!-- 🏆 ACHIEVEMENTS -->
<div class="animated-section">

## 🏆 Achievements & Milestones

<div style="background: linear-gradient(135deg, #2d3748, #4a5568); padding: 25px; border-radius: 15px;">

### 🎯 2024 Milestones
- ✅ Reached **1,000+** GitHub contributions
- ✅ Published **5+** open source projects  
- ✅ Gained **500+** followers
- ✅ Built **3** production applications

### 📈 Progress Tracker
```python
goals_2024 = {
    "open_source_projects": "3/5 completed",
    "technical_blog_posts": "12/20 written", 
    "conference_talks": "1/3 delivered",
    "mentorship_sessions": "15/50 conducted"
}
```

</div>

</div>"""
    
    def _generate_connect_section(self) -> str:
        """Generate interactive connect section"""
        social = self.config.get("social_links", {})
        username = self.config.get("basic_info", {}).get("github_username", "developer")
        
        social_buttons = []
        
        social_platforms = [
            ("🌐 Portfolio", social.get("portfolio"), "764BA2"),
            ("📧 Email", f"mailto:{social.get('email')}" if social.get("email") else None, "D14836"),
            ("💼 LinkedIn", social.get("linkedin"), "0077B5"),
            ("🐦 Twitter/X", social.get("twitter"), "1DA1F2"),
            ("🎥 YouTube", social.get("youtube"), "FF0000"),
            ("📝 Dev.to", social.get("devto"), "0A0A0A"),
            ("☕ Buy Me a Coffee", social.get("buymeacoffee"), "FFDD00"),
            ("🔗 Polywork", social.get("polywork"), "543DE0"),
            ("🐙 GitHub", f"https://github.com/{username}", "181717")
        ]
        
        for label, url, color in social_platforms:
            if url:
                social_buttons.append(f'<a href="{url}" class="social-badge"><img src="https://img.shields.io/badge/{label.replace(" ", "%20")}-{color}?style=for-the-badge&logo={label.split()[0].lower()}&logoColor=white" alt="{label}"/></a>')
        
        return f"""
<!-- 📞 CONNECT -->
<div class="animated-section">

## 📬 Let's Connect!

<div align="center">

{"<br/>".join(social_buttons)}

<br/>
<br/>

### 💌 Always open to:
- 🤝 **Collaborations** on exciting projects
- 💡 **Technical discussions** and knowledge sharing  
- 🎯 **Mentorship** and career guidance
- 🌟 **Open source contributions**

<br/>

<div style="background: linear-gradient(135deg, #1a1f2e, #2d3748); padding: 20px; border-radius: 12px; display: inline-block;">
<h3>🚀 Quick Stats</h3>
<img src="https://github-readme-stats.vercel.app/api/pin/?username={username}&repo={username}&theme=tokyonight" alt="Profile Repository"/>
</div>

</div>

</div>"""
    
    def _generate_footer(self) -> str:
        """Generate animated footer"""
        basic = self.config.get("basic_info", {})
        
        return f"""
<!-- 🎉 FOOTER -->
<div class="animated-section">

<br/>
<br/>

<div align="center">

---

### ⚡ **Fun Fact**: This README was generated with Python! 🐍

<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 2px; border-radius: 50px; display: inline-block;">
  <div style="background: #0d1117; padding: 15px 30px; border-radius: 48px; display: inline-block;">
    <h3 style="margin: 0; color: white;">
      💫 Made with ❤️ by {basic.get('name', 'Developer')}
    </h3>
  </div>
</div>

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=764BA2&height=100&section=footer" alt="Footer Wave"/>

</div>

</div>

<!-- End of readme-container -->
</div>"""
    
    def save_readme(self, content: str, filename: str = "README.md"):
        """Save README with enhanced error handling"""
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"🎉 README generated successfully: {filename}")
            
            # File size info
            file_size = os.path.getsize(filename)
            print(f"📁 File size: {file_size / 1024:.2f} KB")
            
        except Exception as e:
            print(f"❌ Error saving README: {e}")
    
    def run(self, config_file: str = "config.json"):
        """Enhanced main execution with performance tracking"""
        import time
        start_time = time.time()
        
        print("🚀 Starting Ultimate GitHub Profile README Generator...")
        print("⏳ Loading configuration and generating...\n")
        
        try:
            # Load configuration
            self.load_config(config_file)
            
            # Generate README
            readme_content = self.generate_readme()
            
            # Save README
            self.save_readme(readme_content)
            
            execution_time = time.time() - start_time
            print(f"\n✅ Generation completed in {execution_time:.2f} seconds!")
            print("🎨 Your stunning, responsive GitHub Profile README is ready!")
            print("📋 Copy the content to your GitHub profile repository!")
            print("🌟 Don't forget to star the repository if you love it!")
            
        except Exception as e:
            print(f"❌ Error during generation: {e}")
            sys.exit(1)


def main():
    """Enhanced main function with rich argument parsing"""
    parser = argparse.ArgumentParser(
        description="🎨 Generate stunning, responsive GitHub Profile READMEs",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                          # Use default config.json
  %(prog)s --config my_config.json  # Use custom config file
  %(prog)s --interactive            # Force interactive setup
  %(prog)s --help                   # Show this help message

Features:
  ✨ Responsive design for all devices
  🎨 Animated components and gradients  
  📊 Real-time GitHub metrics
  🔧 Interactive skill progress bars
  🚀 Fast generation with performance tracking
        """
    )
    
    parser.add_argument("--config", "-c", default="config.json", 
                       help="Configuration file path (default: config.json)")
    parser.add_argument("--interactive", "-i", action="store_true",
                       help="Force interactive configuration setup")
    parser.add_argument("--output", "-o", default="README.md",
                       help="Output filename (default: README.md)")
    
    args = parser.parse_args()
    
    generator = UltimateReadmeGenerator()
    
    if args.interactive or not os.path.exists(args.config):
        generator.create_interactive_config()
    
    generator.run(args.config)


if __name__ == "__main__":
    main()
