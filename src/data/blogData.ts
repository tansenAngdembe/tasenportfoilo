export interface BlogSection {
  id: string;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    filename?: string;
  };
  callout?: {
    type: "info" | "warning" | "tip" | "danger";
    title?: string;
    text: string;
  };
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  contentType: "Tutorial" | "How-to" | "Guide" | "Troubleshooting" | "Example" | "Comparison";
  readTime: string;
  publishedDate: string;
  lastModified?: string;
  summary: string;
  tags: string[];
  metaDescription: string;
  keywords: string[];
  imageQuery: string;
  featured?: boolean;
  sections: BlogSection[];
  faqs?: BlogFAQ[];
  relatedSlugs?: string[];
}

export const BLOG_CATEGORIES = [
  "All",
  "Spring Boot & Java",
  "AWS",
  "Docker",
  "Troubleshooting",
  "Redis",
  "MySQL & Database",
  "Linux",
  "Git & GitHub",
  "Java Advanced",
  "REST API",
  "Cloudflare & Hosting",
  "IntelliJ IDEA",
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

// Helper to convert CSV string to a URL-friendly slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "spring-boot-jwt-authentication-tutorial",
    title: "Spring Boot JWT Authentication Tutorial: A Complete Step-by-Step Guide",
    category: "Spring Boot & Java",
    priority: "High",
    contentType: "Tutorial",
    readTime: "12 min read",
    publishedDate: "2026-03-10",
    lastModified: "2026-03-12",
    summary: "Learn how to build a stateless, enterprise-ready JWT (JSON Web Token) authentication and authorization system in Spring Boot 3 with Spring Security 6.",
    tags: ["Spring Boot", "JWT", "Spring Security", "Java", "Backend Security", "REST API"],
    metaDescription: "Master Spring Boot JWT authentication tutorial with Spring Security 6. Step-by-step implementation covering tokens, filters, user details, and security filter chain.",
    keywords: ["spring boot jwt authentication tutorial", "spring security jwt authentication", "spring boot jwt authentication and authorization", "how to configure JWT authentication in Spring Boot"],
    imageQuery: "jwt authentication security java programming",
    featured: true,
    relatedSlugs: [
      "spring-security-jwt-authentication",
      "spring-boot-refresh-token-jwt",
      "how-to-fix-spring-security-jwt-authentication-not-working",
      "spring-boot-role-based-authentication"
    ],
    sections: [
      {
        id: "introduction",
        title: "1. Why Stateless JWT Authentication in Spring Boot?",
        content: "Traditional session-based authentication stores user session state on the server memory or database, creating bottlenecks when scaling horizontally behind a load balancer. JSON Web Tokens (JWT) solve this by embedding the user's identity and signed claims directly into an encrypted base64 token.",
        callout: {
          type: "info",
          title: "Architecture Note",
          text: "In Spring Boot 3 & Spring Security 6, WebSecurityConfigurerAdapter has been completely deprecated in favor of component-based SecurityFilterChain beans."
        }
      },
      {
        id: "maven-dependencies",
        title: "2. Adding Dependencies (pom.xml)",
        content: "To implement JWT authentication, you will need Spring Boot Starter Security, Spring Boot Starter Web, and the JJWT (Java JWT) library by io.jsonwebtoken.",
        codeSnippet: {
          language: "xml",
          filename: "pom.xml",
          code: `<!-- Spring Boot Starter Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JJWT Dependencies -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.5</version>
    <scope>runtime</scope>
</dependency>`
        }
      },
      {
        id: "jwt-service",
        title: "3. Creating the JwtService Utility",
        content: "The JwtService handles token creation, cryptographic HMAC-SHA256 signature signing, claim extraction, and expiration verification.",
        codeSnippet: {
          language: "java",
          filename: "JwtService.java",
          code: `@Service
public class JwtService {
    @Value("\${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("\${application.security.jwt.expiration:86400000}")
    private long jwtExpiration;

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}`
        }
      },
      {
        id: "jwt-filter",
        title: "4. Building the JwtAuthenticationFilter",
        content: "We create a custom OncePerRequestFilter that intercepts every incoming HTTP request, reads the Authorization header, validates the bearer token, and sets the SecurityContext.",
        codeSnippet: {
          language: "java",
          filename: "JwtAuthenticationFilter.java",
          code: `@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}`
        }
      },
      {
        id: "security-config",
        title: "5. Configuring the SecurityFilterChain Bean",
        content: "Register your custom JWT filter before the standard UsernamePasswordAuthenticationFilter and configure stateless session management.",
        codeSnippet: {
          language: "java",
          filename: "SecurityConfiguration.java",
          code: `@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`
        },
        callout: {
          type: "tip",
          title: "Production Best Practice",
          text: "Never hardcode secret keys in source control! Store your 256-bit secret key in AWS Secrets Manager or environment variables."
        }
      }
    ],
    faqs: [
      {
        question: "What is the recommended secret key length for HMAC-SHA256 in JWT?",
        answer: "The HMAC-SHA256 algorithm requires a cryptographic key of at least 256 bits (32 bytes). It is recommended to generate a base64-encoded string of 64+ hexadecimal characters."
      },
      {
        question: "How do I handle token expiration and refresh tokens in Spring Boot?",
        answer: "Set access tokens to short lifespans (e.g. 15 minutes) and issue a cryptographically random Refresh Token stored in Redis or database. When the access token expires, clients call the `/api/v1/auth/refresh` endpoint to obtain a new token."
      }
    ]
  },
  {
    id: 2,
    slug: "dockerize-spring-boot-application",
    title: "How to Dockerize a Spring Boot Application with Multi-Stage Builds",
    category: "Docker",
    priority: "High",
    contentType: "How-to",
    readTime: "9 min read",
    publishedDate: "2026-03-08",
    lastModified: "2026-03-11",
    summary: "Step-by-step guide to containerizing Java Spring Boot apps with Docker. Learn multi-stage caching, minimal JRE base images, non-root users, and Docker Compose.",
    tags: ["Docker", "Spring Boot", "DevOps", "Containers", "Docker Compose", "Production"],
    metaDescription: "Learn how to Dockerize Spring Boot applications using optimized multi-stage Dockerfiles, Eclipse Temurin Alpine JRE, and Docker Compose with MySQL.",
    keywords: ["Dockerize Spring Boot application", "Spring Boot Dockerfile example", "multi stage Dockerfile for Spring Boot", "Spring Boot production Dockerfile"],
    imageQuery: "docker container cloud kubernetes java devops",
    featured: true,
    relatedSlugs: [
      "spring-boot-docker-compose-mysql",
      "spring-boot-docker-compose-redis",
      "how-to-fix-docker-container-cannot-connect-to-mysql",
      "deploy-spring-boot-docker-container-on-aws"
    ],
    sections: [
      {
        id: "multi-stage-dockerfile",
        title: "1. Optimized Multi-Stage Dockerfile",
        content: "A multi-stage build separates the compile-time Maven build environment from the lean runtime JRE layer, drastically shrinking the final image size from 600MB down to under 120MB.",
        codeSnippet: {
          language: "dockerfile",
          filename: "Dockerfile",
          code: `# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY pom.xml .
# Cache maven dependencies
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Run as non-root user for enterprise security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]`
        },
        callout: {
          type: "tip",
          title: "JVM Container Ergonomics",
          text: "Always include -XX:MaxRAMPercentage=75.0 instead of fixed -Xmx flags so the JVM respects Docker cgroup memory limits automatically."
        }
      },
      {
        id: "docker-compose-integration",
        title: "2. Multi-Container Orchestration with Docker Compose",
        content: "Here is a production-ready docker-compose.yml wiring your Spring Boot backend with MySQL 8 and Redis caching on an isolated bridge network.",
        codeSnippet: {
          language: "yaml",
          filename: "docker-compose.yml",
          code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysqldb:3306/portfolio_db?useSSL=false&allowPublicKeyRetrieval=true
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=secret
      - SPRING_DATA_REDIS_HOST=redis
      - SPRING_DATA_REDIS_PORT=6379
    depends_on:
      mysqldb:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - backend-net

  mysqldb:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: portfolio_db
      MYSQL_ROOT_PASSWORD: secret
    ports:
      - "3307:3306"
    volumes:
      - db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend-net

  redis:
    image: redis:7.2-alpine
    ports:
      - "6379:6379"
    networks:
      - backend-net

volumes:
  db_data:

networks:
  backend-net:
    driver: bridge`
        }
      }
    ],
    faqs: [
      {
        question: "Why does my Docker container fail to connect to MySQL on localhost?",
        answer: "Inside a container, 'localhost' refers to the container itself. Use the Docker service name (e.g. `jdbc:mysql://mysqldb:3306/db_name`) to connect over the internal Docker network."
      }
    ]
  },
  {
    id: 3,
    slug: "spring-boot-redis-caching-tutorial",
    title: "Spring Boot Redis Caching: Boost API Performance by 10x",
    category: "Redis",
    priority: "High",
    contentType: "Tutorial",
    readTime: "10 min read",
    publishedDate: "2026-03-05",
    lastModified: "2026-03-09",
    summary: "Master in-memory caching with Redis and Spring Boot. Learn @Cacheable, @CachePut, @CacheEvict, custom TTL configurations, and cache stampede prevention.",
    tags: ["Redis", "Spring Boot", "Caching", "Performance", "NoSQL", "High Scale"],
    metaDescription: "Boost your Spring Boot REST API performance with Redis caching. Comprehensive guide covering RedisCacheManager, TTL serialization, and eviction strategies.",
    keywords: ["spring boot redis caching", "Redis with Spring Boot tutorial", "Spring Boot Redis configuration", "Redis caching REST API"],
    imageQuery: "redis in-memory cache database speed performance",
    featured: true,
    relatedSlugs: [
      "spring-boot-redis-rate-limiting",
      "spring-boot-redis-template-example",
      "how-to-fix-redis-connection-refused-in-spring-boot",
      "redis-ttl-explained"
    ],
    sections: [
      {
        id: "redis-config",
        title: "1. Spring Data Redis Configuration & Custom Serializer",
        content: "By default, Redis stores serialized Java binary streams which are unreadable in Redis CLI. We configure GenericJackson2JsonRedisSerializer to store human-readable JSON with TTL.",
        codeSnippet: {
          language: "java",
          filename: "RedisConfig.java",
          code: `@Configuration
@EnableCaching
public class RedisConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30))
                .disableCachingNullValues()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }

    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return (builder) -> builder
                .withCacheConfiguration("products",
                        RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofMinutes(10)))
                .withCacheConfiguration("userProfiles",
                        RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofHours(1)));
    }
}`
        }
      },
      {
        id: "service-layer-caching",
        title: "2. Utilizing @Cacheable, @CachePut & @CacheEvict Annotations",
        content: "Decorate service methods to effortlessly query cache before hitting the relational database.",
        codeSnippet: {
          language: "java",
          filename: "ProductService.java",
          code: `@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepo;

    @Cacheable(value = "products", key = "#id")
    public ProductDto getProductById(Long id) {
        // Slow database query simulated
        return productRepo.findById(id)
                .map(ProductDto::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    @CachePut(value = "products", key = "#result.id")
    public ProductDto updateProduct(Long id, ProductUpdateRequest request) {
        Product product = productRepo.findById(id).orElseThrow();
        product.update(request);
        return ProductDto.fromEntity(productRepo.save(product));
    }

    @CacheEvict(value = "products", key = "#id")
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
}`
        }
      }
    ],
    faqs: [
      {
        question: "How do I prevent cache penetration in Spring Boot?",
        answer: "Do not cache null values blindly; instead, enforce input validation and configure Bloom Filters or short-lived empty key markers with low TTL."
      }
    ]
  },
  {
    id: 4,
    slug: "how-to-deploy-spring-boot-application-on-aws-ecs",
    title: "How to Deploy Spring Boot Docker Application on AWS ECS Fargate",
    category: "AWS",
    priority: "High",
    contentType: "How-to",
    readTime: "15 min read",
    publishedDate: "2026-03-01",
    lastModified: "2026-03-07",
    summary: "Complete production tutorial for deploying containerized Spring Boot applications to AWS ECS Fargate, ECR, Application Load Balancers, and AWS RDS MySQL.",
    tags: ["AWS", "ECS", "Fargate", "ECR", "Docker", "DevOps", "Cloud Architecture"],
    metaDescription: "Deploy Spring Boot Docker containers on AWS ECS Fargate. Complete architectural guide with ALB, ECR, Security Groups, IAM, and GitHub Actions CI/CD.",
    keywords: ["how to deploy Spring Boot application on AWS", "AWS ECS Spring Boot deployment", "AWS ECS Docker deployment", "deploy Spring Boot Docker container on AWS"],
    imageQuery: "cloud computing aws server architecture datacenters devops",
    featured: true,
    relatedSlugs: [
      "aws-ecs-504-gateway-timeout",
      "aws-ecr-docker-image-tutorial",
      "github-actions-aws-ecr-deployment",
      "aws-security-groups-explained"
    ],
    sections: [
      {
        id: "aws-architecture",
        title: "1. AWS Production Architecture Overview",
        content: "We will establish a high-availability infrastructure spanning 2 Availability Zones (AZs) featuring: Internet Gateway, Public Subnets (ALB), Private Subnets (ECS Fargate Tasks & RDS MySQL), NAT Gateway, and AWS ECR.",
        callout: {
          type: "info",
          title: "Security Best Practice",
          text: "Never place Spring Boot ECS containers in public subnets! Keep tasks in private subnets reachable only via Application Load Balancers (ALB)."
        }
      },
      {
        id: "task-definition",
        title: "2. AWS ECS Task Definition (Fargate)",
        content: "Define the CPU, Memory allocations, CloudWatch log streams, and environment secrets pointing to AWS Parameter Store or Secrets Manager.",
        codeSnippet: {
          language: "json",
          filename: "task-definition.json",
          code: `{
  "family": "springboot-portfolio-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "springboot-app",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/springboot-app:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        { "name": "SPRING_PROFILES_ACTIVE", "value": "prod" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/springboot-portfolio",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:8080/actuator/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}`
        }
      }
    ]
  },
  {
    id: 5,
    slug: "how-to-fix-spring-security-jwt-authentication-not-working",
    title: "How to Fix Spring Security JWT Authentication Not Working (401 & 403 Errors)",
    category: "Troubleshooting",
    priority: "High",
    contentType: "Troubleshooting",
    readTime: "11 min read",
    publishedDate: "2026-02-26",
    lastModified: "2026-03-02",
    summary: "Fix 401 Unauthorized, 403 Forbidden, expired JWT signatures, missing authorities, and CORS preflight OPTIONS blocking in Spring Boot 3.",
    tags: ["Troubleshooting", "Spring Security", "JWT", "Spring Boot", "Bug Fixes", "CORS"],
    metaDescription: "Troubleshoot and fix Spring Security JWT errors: 401 Unauthorized, 403 Forbidden, CORS filter ordering, and token parser exceptions.",
    keywords: ["How to Fix Spring Security JWT Authentication Not Working", "How to Fix 401 Unauthorized in Spring Boot JWT", "How to Fix 403 Forbidden in Spring Security", "How to Fix CORS Error in Spring Boot"],
    imageQuery: "code debugging software developer bug fixing computer error",
    featured: true,
    relatedSlugs: [
      "spring-boot-jwt-authentication-tutorial",
      "how-to-fix-cors-error-in-spring-boot",
      "spring-boot-role-based-authentication"
    ],
    sections: [
      {
        id: "root-cause-analysis",
        title: "1. Top Reasons JWT Authentication Fails",
        content: "When users report 'JWT authentication not working', the issue almost always falls into one of 4 buckets:\n1. **CORS Preflight Blocking:** Browser sends `OPTIONS` without Authorization header which gets rejected with 401/403.\n2. **ROLE_ Prefix Mismatch:** In Spring Security, `hasRole('ADMIN')` requires the authority string to be `ROLE_ADMIN`.\n3. **Filter Order:** The JWT filter is placed after `UsernamePasswordAuthenticationFilter`.\n4. **Expired or Tampered Secret Key.**",
        callout: {
          type: "danger",
          title: "Crucial Rule",
          text: "Never use hasRole('ROLE_ADMIN') in your SecurityConfig! Spring automatically prepends 'ROLE_' when hasRole() is called."
        }
      },
      {
        id: "cors-fix",
        title: "2. The Bulletproof Spring Boot CORS Configuration",
        content: "Attach a `CorsConfigurationSource` directly inside the `SecurityFilterChain` bean to guarantee CORS filters run before authentication checks.",
        codeSnippet: {
          language: "java",
          filename: "CorsConfig.java",
          code: `@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:3000", "https://tansenangdembe.com.np"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}`
        }
      }
    ]
  },
  {
    id: 6,
    slug: "mysql-indexing-best-practices-and-query-optimization",
    title: "MySQL Indexing Best Practices: From Slow Queries to Millisecond Speeds",
    category: "MySQL & Database",
    priority: "Medium",
    contentType: "Guide",
    readTime: "10 min read",
    publishedDate: "2026-02-22",
    summary: "Deep dive into B-Tree indexes, composite indexing left-prefix rule, EXPLAIN query plan analysis, and avoiding full table scans in MySQL 8.",
    tags: ["MySQL", "Database", "Performance", "Indexing", "SQL Optimization", "Backend"],
    metaDescription: "Master MySQL indexing best practices and query optimization. Learn EXPLAIN command breakdown, composite indexes, and index selectivity.",
    keywords: ["MySQL indexing best practices", "MySQL query optimization", "MySQL EXPLAIN query tutorial", "MySQL transactions and isolation levels"],
    imageQuery: "database server relational sql optimization data analytics",
    relatedSlugs: [
      "mysql-query-optimization",
      "mysql-explain-query-tutorial",
      "how-to-fix-mysql-connection-refused-in-spring-boot"
    ],
    sections: [
      {
        id: "b-tree-composite",
        title: "1. The Left-Prefix Rule for Composite Indexes",
        content: "If you create an index on `(user_id, status, created_at)`, MySQL can use the index for queries filtering `(user_id)`, `(user_id, status)`, or all three, but CANNOT use the index efficiently for `(status, created_at)` alone.",
        codeSnippet: {
          language: "sql",
          filename: "indexes.sql",
          code: `-- High cardinality index on frequently filtered columns
CREATE INDEX idx_orders_user_status_created 
ON orders (user_id, status, created_at);

-- Analyze the query execution plan
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 1042 AND status = 'COMPLETED' 
ORDER BY created_at DESC;`
        }
      }
    ]
  },
  {
    id: 7,
    slug: "linux-commands-every-developer-should-know",
    title: "25 Essential Linux Commands Every Backend Developer Must Master",
    category: "Linux",
    priority: "Medium",
    contentType: "Guide",
    readTime: "8 min read",
    publishedDate: "2026-02-18",
    summary: "Essential terminal commands for developers: systemd process management, grep, awk, find, chmod, chown, netstat, htop, and journalctl server log inspection.",
    tags: ["Linux", "DevOps", "Terminal", "Bash", "System Administration", "Ubuntu"],
    metaDescription: "Essential Linux commands and sysadmin guide for software engineers. Master systemctl, journalctl, grep, permissions, and network debugging.",
    keywords: ["Linux commands every developer should know", "Linux file permissions explained", "chmod command explained", "Linux grep command examples"],
    imageQuery: "linux bash terminal command line server sysadmin",
    relatedSlugs: [
      "how-to-deploy-spring-boot-application-on-linux",
      "how-to-configure-nginx-reverse-proxy",
      "how-to-troubleshoot-linux-server"
    ],
    sections: [
      {
        id: "essential-commands",
        title: "1. Process and Service Management with systemctl",
        content: "Running Spring Boot services as daemonized background processes using Linux systemd:",
        codeSnippet: {
          language: "bash",
          filename: "systemctl_guide.sh",
          code: `# Check service status
sudo systemctl status springboot.service

# Live follow logs from application
journalctl -u springboot.service -f -n 100

# Inspect open ports and network sockets
sudo ss -tulpn | grep 8080`
        }
      }
    ]
  },
  {
    id: 8,
    slug: "java-virtual-threads-modern-concurrency",
    title: "Java Virtual Threads (Project Loom): Revolutionizing Backend Concurrency",
    category: "Java Advanced",
    priority: "Medium",
    contentType: "Guide",
    readTime: "11 min read",
    publishedDate: "2026-02-15",
    summary: "Explore Java 21+ Virtual Threads, lightweight carrier threads, high-throughput I/O blocking handling, and migration from legacy thread pools.",
    tags: ["Java", "Concurrency", "Virtual Threads", "Project Loom", "JVM", "Performance"],
    metaDescription: "Understand Java Virtual Threads (Project Loom) in Java 21+. Learn how virtual threads achieve millions of concurrent requests with minimal RAM.",
    keywords: ["Java virtual threads", "Java multithreading tutorial", "Java CompletableFuture tutorial", "JVM memory explained"],
    imageQuery: "java programming code multi-threading performance cpu hardware",
    relatedSlugs: [
      "java-stream-api-tutorial",
      "java-completablefuture-tutorial",
      "java-memory-management"
    ],
    sections: [
      {
        id: "loom-breakdown",
        title: "1. Platform Threads vs. Virtual Threads",
        content: "Traditional Java platform threads wrap 1:1 onto operating system kernel threads, consuming ~1MB of stack memory each. Virtual threads are managed entirely in JVM user-space, costing only hundreds of bytes.",
        codeSnippet: {
          language: "java",
          filename: "VirtualThreadDemo.java",
          code: `public class VirtualThreadDemo {
    public static void main(String[] args) {
        // Spawn 100,000 concurrent virtual threads effortlessly
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 100_000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(Duration.ofSeconds(1));
                    return i;
                });
            });
        } // Automatically awaits completion of all virtual threads
    }
}`
        }
      }
    ]
  },
  {
    id: 9,
    slug: "github-actions-spring-boot-ci-cd-pipeline",
    title: "Production GitHub Actions CI/CD Pipeline for Spring Boot & Docker",
    category: "Git & GitHub",
    priority: "Medium",
    contentType: "Tutorial",
    readTime: "9 min read",
    publishedDate: "2026-02-10",
    summary: "Automate testing, Maven build packaging, Docker image generation, and automated AWS ECR push on every pull request using GitHub Actions.",
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Spring Boot", "Docker", "Automation"],
    metaDescription: "Build automated GitHub Actions CI/CD pipeline for Spring Boot apps. Complete workflow for unit tests, Maven build, Docker caching, and AWS ECR release.",
    keywords: ["GitHub Actions Spring Boot CI/CD", "GitHub Actions Docker build", "GitHub Actions AWS ECR deployment", "Git commands every developer should know"],
    imageQuery: "github devops automated pipeline coding software workflow",
    relatedSlugs: [
      "git-merge-vs-rebase",
      "github-pull-request-tutorial",
      "deploy-spring-boot-docker-container-on-aws"
    ],
    sections: [
      {
        id: "workflow-yaml",
        title: "1. GitHub Actions Workflow (.github/workflows/deploy.yml)",
        content: "Here is a high-speed CI/CD pipeline leveraging GitHub runner Maven cache and Docker layer caching.",
        codeSnippet: {
          language: "yaml",
          filename: ".github/workflows/ci-cd.yml",
          code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: maven

      - name: Run Unit & Integration Tests
        run: mvn clean verify

      - name: Build Docker Image
        run: docker build -t my-portfolio-app:latest .`
        }
      }
    ]
  },
  {
    id: 10,
    slug: "rest-api-design-best-practices",
    title: "Enterprise REST API Design Best Practices: Status Codes, Versioning & Security",
    category: "REST API",
    priority: "Medium",
    contentType: "Guide",
    readTime: "10 min read",
    publishedDate: "2026-02-05",
    summary: "Architect clean, scalable, self-documenting REST APIs. Master idempotency, HTTP status codes, pagination models, RFC 7807 error formats, and Swagger OpenAPI.",
    tags: ["REST API", "API Design", "Spring Boot", "Architecture", "Swagger", "Web Services"],
    metaDescription: "Master REST API design best practices. Learn resource naming conventions, HTTP status codes, filtering, rate limiting, and OpenAPI Swagger documentation.",
    keywords: ["REST API design best practices", "REST API authentication", "Spring Boot Swagger OpenAPI tutorial", "REST API pagination"],
    imageQuery: "api programming rest json networking backend architecture",
    relatedSlugs: [
      "spring-boot-rest-api-tutorial",
      "spring-boot-global-exception-handling",
      "spring-boot-validation-example"
    ],
    sections: [
      {
        id: "rfc7807-errors",
        title: "1. Standardized Error Responses with ProblemDetail (RFC 7807)",
        content: "Spring Boot 3 natively incorporates RFC 7807 ProblemDetail specifications for unified error payloads.",
        codeSnippet: {
          language: "java",
          filename: "GlobalExceptionHandler.java",
          code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Resource Not Found");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}`
        }
      }
    ]
  },
  {
    id: 11,
    slug: "how-to-configure-nginx-reverse-proxy-and-ssl",
    title: "How to Configure Nginx Reverse Proxy with Free SSL (Let's Encrypt / Certbot)",
    category: "Linux",
    priority: "Medium",
    contentType: "How-to",
    readTime: "8 min read",
    publishedDate: "2026-02-01",
    summary: "Complete walkthrough on setting up Nginx as a reverse proxy for your Spring Boot application with automated HTTPS renewal via Certbot.",
    tags: ["Nginx", "SSL", "Linux", "Ubuntu", "Reverse Proxy", "Security"],
    metaDescription: "Configure Nginx reverse proxy for Java Spring Boot apps with automatic HTTPS SSL via Let's Encrypt Certbot on Ubuntu Linux.",
    keywords: ["how to configure Nginx reverse proxy", "how to configure SSL with Nginx", "how to install Nginx on Ubuntu", "how to fix Nginx 502 bad gateway"],
    imageQuery: "ssl security lock server web hosting encryption certificate",
    relatedSlugs: [
      "how-to-deploy-spring-boot-application-on-linux",
      "how-to-fix-nginx-502-bad-gateway",
      "how-to-configure-cloudflare-ssl"
    ],
    sections: [
      {
        id: "nginx-config-sample",
        title: "1. Nginx Reverse Proxy Configuration",
        content: "Direct traffic from port 80/443 to your Spring Boot internal server running on port 8080 with proper WebSocket & HTTP header forwarding:",
        codeSnippet: {
          language: "nginx",
          filename: "/etc/nginx/sites-available/portfolio.conf",
          code: `server {
    server_name api.tansenangdembe.com.np;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 90;
    }
}`
        }
      }
    ]
  },
  {
    id: 12,
    slug: "how-to-fix-cors-error-in-spring-boot",
    title: "How to Fix CORS Error in Spring Boot (Cross-Origin Request Blocked)",
    category: "Troubleshooting",
    priority: "High",
    contentType: "Troubleshooting",
    readTime: "7 min read",
    publishedDate: "2026-01-28",
    summary: "Resolve 'No Access-Control-Allow-Origin header is present on the requested resource' in React, Angular, and Next.js frontend calls to Spring Boot.",
    tags: ["CORS", "Spring Boot", "React", "Troubleshooting", "Web Security"],
    metaDescription: "Fix CORS errors in Spring Boot 3 with React frontend. Learn how to configure global WebMvcConfigurer and Spring Security CorsFilter.",
    keywords: ["How to Fix CORS Error in Spring Boot", "spring boot rest api tutorial", "how to secure REST API with Spring Security"],
    imageQuery: "browser error network request cors javascript http",
    relatedSlugs: [
      "spring-boot-jwt-authentication-tutorial",
      "how-to-fix-spring-security-jwt-authentication-not-working"
    ],
    sections: [
      {
        id: "global-webmvc-cors",
        title: "1. Spring WebMvcConfigurer Global CORS Configuration",
        content: "For standalone Spring MVC endpoints without Spring Security or in complement with SecurityFilterChain:",
        codeSnippet: {
          language: "java",
          filename: "WebConfig.java",
          code: `@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173", "https://tansenangdembe.com.np")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}`
        }
      }
    ]
  }
];

// Dynamically generate entries from the CSV keyword list to ensure all 179 topics are queryable
import { CSV_KEYWORD_RECORDS } from "./blogKeywordsData";

// Combine manually curated detailed articles with generated keyword topics
export function getAllPosts(): BlogPost[] {
  const manualSlugs = new Set(ALL_BLOG_POSTS.map(p => p.slug));
  const additionalPosts: BlogPost[] = CSV_KEYWORD_RECORDS
    .filter(rec => !manualSlugs.has(generateSlug(rec.topic)))
    .map((rec, index) => {
      const slug = generateSlug(rec.topic);
      const title = rec.topic.charAt(0).toUpperCase() + rec.topic.slice(1);
      return {
        id: 100 + index,
        slug,
        title,
        category: rec.category,
        priority: rec.priority as "High" | "Medium" | "Low",
        contentType: rec.contentType as any,
        readTime: `${6 + (index % 5)} min read`,
        publishedDate: "2026-02-15",
        summary: `Comprehensive engineering guide on ${rec.topic}. Best practices, practical implementation code, configuration, and architecture tips.`,
        tags: [rec.category.split(" ")[0], rec.contentType, "Java", "Backend"],
        metaDescription: `Read our in-depth developer guide on ${rec.topic}. Includes step-by-step instructions, production configurations, and troubleshooting advice.`,
        keywords: [rec.topic, `${rec.topic} tutorial`, `${rec.topic} guide`, `${rec.category} best practices`],
        imageQuery: `${rec.topic} software programming`,
        sections: [
          {
            id: "overview",
            title: `1. Overview of ${title}`,
            content: `Understanding ${rec.topic} is fundamental for building reliable, high-performance systems. In this guide, we dive deep into the architectural foundation, core concepts, and key implementation guidelines.`,
            callout: {
              type: "info",
              title: "Key Takeaway",
              text: `Proper configuration and monitoring of ${rec.topic} prevents critical production bottlenecks and enhances system stability.`
            }
          },
          {
            id: "step-by-step",
            title: `2. Step-by-Step Implementation`,
            content: `Follow these structured best practices when working with ${rec.category} in enterprise environments:\n- Configure robust connection handling and timeout policies.\n- Always validate inputs and sanitize external parameters.\n- Monitor resource utilization and system logs regularly.`,
            codeSnippet: {
              language: rec.category.includes("Linux") ? "bash" : rec.category.includes("MySQL") ? "sql" : "java",
              filename: `${slug}-sample.${rec.category.includes("Linux") ? "sh" : rec.category.includes("MySQL") ? "sql" : "java"}`,
              code: rec.category.includes("Linux") 
                ? `# Execute verification commands\necho "Checking status for ${rec.topic}"\nsudo systemctl status service-name` 
                : rec.category.includes("MySQL")
                ? `-- Query optimization for ${rec.topic}\nSELECT * FROM system_records WHERE status = 'ACTIVE';`
                : `// Sample implementation for ${rec.topic}\n@Service\npublic class ${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Service {\n    // Service logic implementation\n}`
            }
          },
          {
            id: "troubleshooting-tips",
            title: `3. Troubleshooting & Production Considerations`,
            content: `When deploying to production, monitor memory pools, ensure correct network security rules, and implement graceful shutdown handlers.`
          }
        ],
        faqs: [
          {
            question: `What is the primary benefit of ${rec.topic}?`,
            answer: `It streamlines developer workflow, optimizes backend resource consumption, and ensures enterprise-grade security and reliability.`
          }
        ]
      };
    });

  return [...ALL_BLOG_POSTS, ...additionalPosts];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts();
  
  // If specific relatedSlugs are declared, prioritize them
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const explicit = currentPost.relatedSlugs
      .map(s => all.find(p => p.slug === s))
      .filter((p): p is BlogPost => p !== undefined && p.slug !== currentPost.slug);
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  // Otherwise match by same category, then matching tags
  const matched = all
    .filter(p => p.slug !== currentPost.slug)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.category === currentPost.category) scoreA += 5;
      if (b.category === currentPost.category) scoreB += 5;
      
      const aCommonTags = a.tags.filter(t => currentPost.tags.includes(t)).length;
      const bCommonTags = b.tags.filter(t => currentPost.tags.includes(t)).length;
      scoreA += aCommonTags;
      scoreB += bCommonTags;

      return scoreB - scoreA;
    });

  return matched.slice(0, limit);
}
